import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle, FaBell, FaChartLine, FaWallet, FaCogs } from 'react-icons/fa';
import logo from '../../Assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="expendo Logo" className="navbar-logo-img" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FaChartLine className="navbar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/portfolio">
            <FaWallet className="navbar-icon" /> Portfolio
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCogs className="navbar-icon" /> Settings
          </Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <FaBell className="navbar-icon" />
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;