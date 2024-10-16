import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import News from './Pages/News/News';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Portfolio from './Pages/Portfolio/Portfolio';
import About from './Pages/About us/about';
import SignIn from './Pages/Sign in/Signin';
import SignUp from './Pages/Sign up/Signup'; {/* Add SignUp import */}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Sign In and Sign Up pages without Layout (no Navbar, no Footer) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}

        {/* Main layout (with Navbar and Footer) */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
