import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../../Assets/hero1.jpeg'; // Add your hero image here
import track1 from '../../Assets/track2 (1).jpeg';
import track2 from '../../Assets/track2 (2).jpeg';
import track3 from '../../Assets/track3.jpg';
import img1 from '../../Assets/img1 (1).png';
import img2 from '../../Assets/img1 (2).png';
import img3 from '../../Assets/img1 (3).png';

const features = [
  {
    title: 'Simple Money Tracker',
    description: 'It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.',
    image: img1,
    alt: 'Simple Money Tracker',
  },
  {
    title: 'Painless Budgeting',
    description: 'One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.',
    image: img2,
    alt: 'Painless Budgeting',
  },
  {
    title: 'The Whole Picture in One Place',
    description: 'One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.',
    image: img3,
    alt: 'Spending Patterns',
  },
];


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img src={heroImage} alt="Financial Management" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Financial Future with Expendo</h1>
          <p className="hero-subtitle">
            Harness the power of cutting-edge financial tools to take control of your money and achieve your goals.
          </p>
          <div className="cta-container">
            <Link to="/signup" className="cta-button">Get Started for Free</Link>
            <Link to="/learn-more" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Expendo?</h2>
        <div className="features-container">
          <div className="feature">
            <div className="feature-content">
              <h3>Real-time Insights</h3>
              <p>Track your expenses, analyze spending patterns, and get insights that matter.</p>
            </div>
            <img src={track1} alt="Real-time Insights" className="feature-image" />
          </div>
          <div className="feature">
            <div className="feature-content">
              <h3>Seamless Integration</h3>
              <p>Connect with your favorite financial tools and keep everything in sync effortlessly.</p>
            </div>
            <img src={track2} alt="Seamless Integration" className="feature-image" />
          </div>
          <div className="feature">
            <div className="feature-content">
              <h3>Advanced Security</h3>
              <p>Your data is protected with industry-leading security measures.</p>
            </div>
            <img src={track3} alt="Advanced Security" className="feature-image" />
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="new-features-section">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`new-feature ${index % 2 === 1 ? 'reverse' : ''}`}
        >
          <div className="new-feature-content">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
          <img
            src={feature.image}
            alt={feature.alt}
            className="new-feature-image"
          />
        </div>
      ))}
    </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Trusted by Thousands of Users</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>"Expendo transformed how I manage my finances. The real-time insights are invaluable!"</p>
            <span>- Alex Johnson</span>
          </div>
          <div className="testimonial">
            <p>"A game-changer for anyone serious about keeping their finances in order. Highly recommend!"</p>
            <span>- Sarah Williams</span>
          </div>
          <div className="testimonial">
            <p>"I love how easy it is to integrate Expendo with all my financial tools. It's seamless."</p>
            <span>- Michael Lee</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="section-title">Take Control of Your Finances Today</h2>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default HomePage;
