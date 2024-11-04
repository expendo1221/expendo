import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle, FaChartLine, FaWallet, FaEnvelope, FaNewspaper } from 'react-icons/fa';  // Add FaNewspaper
import logo from '../../Assets/logo.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track user authentication
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by checking for a token in localStorage
    const token = localStorage.getItem('auth-token'); // Update to 'auth-token'
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown visibility
  };

  const handleLogout = () => {
    // Remove token from localStorage and update isAuthenticated
    localStorage.removeItem('auth-token'); // Update to 'auth-token'
    setIsAuthenticated(false);

    // Redirect to Signin page after logout
    navigate('/signin');
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
          <Link to="/news">
            <FaNewspaper className="navbar-icon" /> News  {/* Updated the icon to FaNewspaper */}
          </Link>
        </li>
        <li>
          <Link to="/contactus">
            <FaEnvelope className="navbar-icon" /> Contact Us  {/* Changed the icon to FaEnvelope */}
          </Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <div className="navbar-user" onClick={toggleDropdown}>
          <FaUserCircle className="navbar-icon" />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="navbar-dropdown">
              <ul>
                {!isAuthenticated ? (
                  <>
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                  </>
                ) : (
                  <li onClick={handleLogout}>Logout</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
