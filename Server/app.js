const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Income and Expense model
const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

const expenseSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

const Income = mongoose.model('Income', incomeSchema);
const Expense = mongoose.model('Expense', expenseSchema);

// Contact Us model
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// Routes for Authentication
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error in registration' });
  }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error in login' });
  }
});

// Routes for Income and Expenses
// Get all incomes
app.get('/api/incomes', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching incomes' });
  }
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Add new income
app.post('/api/incomes', async (req, res) => {
  const { source, amount, date } = req.body;
  try {
    const newIncome = new Income({ source, amount, date });
    await newIncome.save();
    res.json(newIncome);
  } catch (err) {
    res.status(500).json({ message: 'Error adding income' });
  }
});

// Add new expense
app.post('/api/expenses', async (req, res) => {
  const { source, amount, category, date } = req.body;
  try {
    const newExpense = new Expense({ source, amount, category, date });
    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense' });
  }
});

// Reset incomes and expenses
app.delete('/api/reset', async (req, res) => {
  try {
    await Income.deleteMany();
    await Expense.deleteMany();
    res.json({ message: 'All entries have been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting entries' });
  }
});

// Routes for Contact Us functionality
// POST Route to submit contact form
app.post('/api/contact-us', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new ContactUs({ name, email, message });
    await newMessage.save();
    res.json({ message: 'Message submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting message' });
  }
});

// GET Route to retrieve all contact messages (optional)
app.get('/api/contact-us', async (req, res) => {
  try {
    const messages = await ContactUs.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
