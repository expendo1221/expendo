import React from 'react';
import './about.css';

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          {/* <img src="your-hero-image-url.jpg" alt="Hero" /> */}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">
            Discover how Expendo empowers you to take control of your finances.
          </p>
          <div className="cta-container">
            <a href="#features" className="cta-button">Learn More</a>
            <a href="#contact" className="cta-button secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <div className="about-container">
        <section className="about-us-content" id="about">
          <div className="section-box">
            <h2>About Us</h2>
            <p>
              Welcome to <strong>Expendo</strong>, your personal financial companion designed to make managing your money effortless and insightful. In today’s fast-paced world, keeping track of expenses, monitoring investments, and staying on top of your financial goals can be a challenge. That’s where we come in.
            </p>
          </div>

          <div className="section-box">
            <h2>Our Mission</h2>
            <p>
              At <strong>Expendo</strong>, our mission is simple: to empower individuals to take control of their finances with ease. We believe everyone should have access to intuitive tools that help them manage their expenses, investments, and overall financial health—without the complexity.
            </p>
          </div>

        <div className="section-box">
          <h2>What We Do</h2>
          <p>
            <strong>Expendo</strong> is more than just an expense tracker. It’s a comprehensive personal finance platform that allows you to:
          </p>
          <ul>
            <li><strong>Track your daily expenses</strong>: Gain a clear understanding of where your money is going, with detailed breakdowns and easy categorization of your spending.</li>
            <li><strong>Visualize your financial data</strong>: Get deeper insights into your spending patterns with beautifully designed charts and graphs, making it easier to identify trends and make informed decisions.</li>
            <li><strong>Manage your investments</strong>: Whether you're new to investing or a seasoned pro, Expendo allows you to monitor your portfolio and track the growth of your investments—all in one place.</li>
          </ul>
        </div>

        <div className="section-box">
          <h2>Why Choose Expendo?</h2>
          <p>
            We created <strong>Expendo</strong> with the belief that personal finance should be stress-free, user-friendly, and accessible to everyone. Here’s why our users love us:
          </p>
          <ul>
            <li><strong>Easy to use</strong>: With a clean, intuitive interface, Expendo makes tracking your finances simple, even if you're new to managing money.</li>
            <li><strong>Real-time insights</strong>: Our dynamic visual charts give you real-time insights into your spending habits and investment performance.</li>
            <li><strong>Security</strong>: We prioritize your data privacy and security. Rest assured, your financial information is encrypted and stored securely.</li>
          </ul>
        </div>

        <div className="section-box">
          <h2>Join the Expendo Community</h2>
          <p>
            Whether you want to get smarter about your daily spending, take control of your savings, or manage your investments like a pro, <strong>Expendo</strong> is here to help you reach your financial goals. Start today and experience the difference of having all your finances at your fingertips.
          </p>
        </div>
      </section>
    </div>
  </>
  );
};

export default AboutUs;



























