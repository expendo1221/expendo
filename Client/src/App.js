import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contact us/ContactUs';  // Correct path for Contact Us
import News from './Pages/News/News';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Portfolio from './Pages/Portfolio/Portfolio';
import About from './Pages/About us/about';
import SignIn from './Pages/Sign in/Signin';
import SignUp from './Pages/Sign up/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Sign In and Sign Up pages without Layout (no Navbar, no Footer) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main layout (with Navbar and Footer) */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="contactus" element={<ContactUs />} /> {/* Only this route should be inside Layout */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
