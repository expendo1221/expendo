import React from 'react';
import styles from './News.module.css';  // Use CSS module import

const newsData = {
  topNews: [
    {
      title: 'Tech Giants See Major Gains in Stock Market',
      content: 'Apple, Google, and Microsoft stocks surged by 10% today...',
      image: 'https://via.placeholder.com/400x250.png?text=Tech+Stock+Surge',
    },
    {
      title: 'Omar Abdullah to take oath as first CM of Jammu and Kashmir UT',
      content: 'Jammu and Kashmir UT gets its first CM today...',
      image: 'https://via.placeholder.com/400x250.png?text=Top+News',
    },
    {
      title: 'Global stocks see gains as U.S. earnings season kicks off',
      content: 'Global markets are on the rise as U.S. earnings reports come in...',
      image: 'https://via.placeholder.com/400x250.png?text=Global+Stocks',
    },
  ],
  economyNews: [
    {
      title: 'Retail inflation rises to nine-month high of 5.5%',
      content: 'Dimming hopes for a rate cut...',
      image: 'https://via.placeholder.com/400x250.png?text=Inflation+Rises',
    },
    {
      title: 'Will inflation hold back RBI from cutting interest rates?',
      content: 'The RBI may face challenges in the next monetary policy...',
      image: 'https://via.placeholder.com/400x250.png?text=RBI+Policy',
    },
  ],
  worldNews: [
    {
      title: 'China stock market drops amid economic concerns',
      content: 'The Chinese stock market faces a rough patch...',
      image: 'https://via.placeholder.com/400x250.png?text=China+Market',
    },
  ],
};

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
            content={newsItem.content}
            image={newsItem.image}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className={styles['app']}>
      <header className={styles['header']}>
        <h1>Finance & Stock News</h1>
        <p>Your trusted source for stock market updates and financial insights.</p>
      </header>
      <main>
        <NewsSection sectionTitle="Top News" newsItems={newsData.topNews} />
        <NewsSection sectionTitle="Economy News" newsItems={newsData.economyNews} />
        <NewsSection sectionTitle="World News" newsItems={newsData.worldNews} />
      </main>
    </div>
  );
}

export default App;
