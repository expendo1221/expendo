import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Signin.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., authentication)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles['signin-container']}>
      <div className={styles['signin-card']}>
        <h2 className={styles['signin-title']}>Sign In</h2>
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
