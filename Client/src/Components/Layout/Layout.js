import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

function Layout() {
  const location = useLocation();

  // Check if the current page is /signin or any other pages you want to exclude the navbar and footer from
  const isSignInPage = location.pathname === '/signin';

  return (
    <div className="layout">
      {/* Only render Navbar if it's not the SignIn page */}
      {!isSignInPage && <Navbar />}

      <div className="content">
        <Outlet /> {/* This renders the matched child routes */}
      </div>

      {/* Only render Footer if it's not the SignIn page */}
      {!isSignInPage && <Footer />}
    </div>
  );
}

export default Layout;
