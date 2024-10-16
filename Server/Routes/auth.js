const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Import User model
require('dotenv').config();

const router = express.Router();

// Sign-Up Route (POST /signup)
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);
    console.log('Received confirmPassword:', confirmPassword);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Password mismatch' });
    }

    // Check if the password is strong (Optional, you can add more rules here)
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 6 characters, and must include letters and numbers
    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({
        msg: 'Password is too weak. It must be at least 6 characters long and contain at least one letter and one number.',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.json({ msg: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Sign-In Route (POST /signin)
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received email:', email);

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token using JWT_SECRET from environment variables
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.json({ token });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
