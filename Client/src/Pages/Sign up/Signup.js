import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import styles from './Signup.module.css'; // Import CSS module

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim spaces from email and passwords
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Debugging logs
    console.log("Trimmed Password:", trimmedPassword);
    console.log("Trimmed Confirm Password:", trimmedConfirmPassword);

    // Validate form fields
    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check if passwords match (debugging log for mismatch check)
    console.log("Do the passwords match?", trimmedPassword === trimmedConfirmPassword);

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the signup request to the backend with both password and confirmPassword
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email: trimmedEmail,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword, // Add confirmPassword here
      });

      // If signup is successful, navigate to the sign-in page
      console.log(response.data);
      navigate('/signin');
    } catch (err) {
      // Error handling
      console.log(err.response);  // Log the error response from the server for more insight
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.msg || 'Server error');
      } else if (err.request) {
        // No response received (network issue)
        setError('Network error. Please try again later.');
      } else {
        // Unexpected error
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h2 className={styles.signupTitle}>Sign Up</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
