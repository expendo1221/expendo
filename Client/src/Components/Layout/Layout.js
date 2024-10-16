import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

function Layout() {
  const location = useLocation();

  // Check if the current page is /signin or /signup
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="layout">
      {/* Only render Navbar if it's not the SignIn or SignUp page */}
      {!isAuthPage && <Navbar />}

      <div className="content">
        <Outlet /> {/* This renders the matched child routes */}
      </div>

      {/* Only render Footer if it's not the SignIn or SignUp page */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
