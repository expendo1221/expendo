import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle, FaBell, FaChartLine, FaWallet, FaCogs } from 'react-icons/fa';
import logo from '../../Assets/logo.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (open) => {
    setDropdownOpen(open);
  };

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
        <div 
          className="user-icon" 
          onMouseEnter={() => toggleDropdown(true)} 
          onMouseLeave={() => toggleDropdown(false)}
        >
          <FaUserCircle className="navbar-icon" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/sign-in" className="dropdown-item">Sign In</Link>
              <Link to="/sign-up" className="dropdown-item">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
