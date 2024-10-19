import React, { useState, useEffect } from 'react';
import styles from './News.module.css';  // Use CSS module import

const API_KEY = '08d9d78574844dc4b614f9dd5b6c1063'; // Your API key
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

const NewsCard = ({ title, content, image }) => {
  return (
    <div className={styles['news-card']}>
      <img src={image} alt={title} className={styles['news-image']} />
      <div className={styles['news-content']}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

// Function to determine if a section should be full-width
const shouldBeFullWidth = (sectionTitle) => {
  return sectionTitle === 'Top News';
};

const NewsSection = ({ sectionTitle, newsItems }) => {
  const sectionClass = shouldBeFullWidth(sectionTitle)
    ? `${styles['news-section']} ${styles['full-width']}`
    : styles['news-section'];

  return (
    <div className={sectionClass}>
      <h2 className={styles['section-title']}>{sectionTitle}</h2>
      <div className={styles['news-grid']}>
        {newsItems.map((newsItem, index) => (
          <NewsCard
            key={index}
            title={newsItem.title}
            content={newsItem.description}
            image={newsItem.urlToImage || 'https://via.placeholder.com/400x250.png'} // Fallback image if not available
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [topNews, setTopNews] = useState([]);
  const [economyNews, setEconomyNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);

  useEffect(() => {
    // Fetch Top News
    const fetchTopNews = async () => {
      const response = await fetch(`${NEWS_API_URL}?category=general&apiKey=${API_KEY}`);
      const data = await response.json();
      setTopNews(data.articles);
    };

    // Fetch Economy News
    const fetchEconomyNews = async () => {
      const response = await fetch(`${NEWS_API_URL}?category=business&apiKey=${API_KEY}`);
      const data = await response.json();
      setEconomyNews(data.articles);
    };

    // Fetch World News
    const fetchWorldNews = async () => {
      const response = await fetch(`${NEWS_API_URL}?category=general&apiKey=${API_KEY}&language=en`);
      const data = await response.json();
      setWorldNews(data.articles);
    };

    // Call fetch functions
    fetchTopNews();
    fetchEconomyNews();
    fetchWorldNews();
  }, []);

  return (
    <div className={styles['app']}>
      <header className={styles['header']}>
        <h1>Finance & Stock News</h1>
        <p>Your trusted source for stock market updates and financial insights.</p>
      </header>
      <main>
        <NewsSection sectionTitle="Top News" newsItems={topNews} />
        <NewsSection sectionTitle="Economy News" newsItems={economyNews} />
        <NewsSection sectionTitle="World News" newsItems={worldNews} />
      </main>
    </div>
  );
}

export default App;
