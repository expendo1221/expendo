import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Portfolio from './Pages/Portfolio/Portfolio';
import About from './Pages/About Us/about';



import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;