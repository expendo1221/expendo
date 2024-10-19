import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signin.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signin', { 
        email, 
        password 
      });
      const { token } = response.data;
      localStorage.setItem('auth-token', token);
      navigate('/dashboard');  // Redirect to the dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles['signin-container']}>
      <div className={styles['signin-card']}>
        <h2 className={styles['signin-title']}>Sign In</h2>
        {error && <p className={styles['error-message']}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles['signin-form']}>
          <div className={styles['signin-input-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className={styles['signin-input-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className={styles['signin-btn']}>Sign In</button>
        </form>
        <div className={styles['signin-footer']}>
          <p>Don't have an account? <Link to="/signup" className={styles['signin-link']}>Sign Up</Link></p>
          <p><Link to="/forgot-password" className={styles['signin-link']}>Forgot Password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
