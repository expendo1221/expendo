import React, { useState, useEffect } from "react";
import { Layout, Table, Row, Col, message, Card, Typography } from "antd";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import styles from "./Portfolio.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { Content } = Layout;
const { Title, Text } = Typography;

// List of stocks with their full names
const STOCKS = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "TSLA", name: "Tesla" },
];

const FINNHUB_API_KEY = "cs6ee6hr01qv8tfqk820cs6ee6hr01qv8tfqk82g"; // Replace with your Finnhub API key

const Portfolio = () => {
  const [realTimeStocks, setRealTimeStocks] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  // Fetch live stock prices
  const fetchLiveStockPrices = async () => {
    setLoading(true);
    const stockData = [];

    try {
      for (const stock of STOCKS) {
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
          params: {
            symbol: stock.symbol,
            token: FINNHUB_API_KEY,
          },
        });

        if (response.data) {
          const stockInfo = {
            name: stock.name,
            symbol: stock.symbol,
            currentPrice: response.data.c.toFixed(2),
            highPrice: response.data.h.toFixed(2),
            lowPrice: response.data.l.toFixed(2),
            lastRefreshed: new Date().toLocaleTimeString(),
            quantity: 10, // Sample quantity for calculation
          };

          stockInfo.totalValue = stockInfo.currentPrice * stockInfo.quantity;
          stockData.push(stockInfo);
        } else {
          message.error(`No data available for ${stock.symbol} (${stock.name}).`);
        }
      }

      setRealTimeStocks(stockData);
      calculatePortfolioValue(stockData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      message.error("Failed to fetch stock data. Please try again later.");
    }
    setLoading(false);
  };

  // Fetch historical stock data
  const fetchHistoricalData = async (symbol) => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
        params: {
          symbol: symbol,
          resolution: "D",
          from: Math.floor(new Date().getTime() / 1000) - 86400 * 30, // 30 days ago
          to: Math.floor(new Date().getTime() / 1000),
          token: FINNHUB_API_KEY,
        },
      });

      if (response.data) {
        const data = response.data.c.map((price, index) => ({
          date: new Date(response.data.t[index] * 1000).toLocaleDateString(),
          price,
        }));
        setHistoricalData((prev) => ({ ...prev, [symbol]: data }));
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
      message.error("Failed to fetch historical data.");
    }
  };

  // Fetch stock news
  const fetchStockNews = async () => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/company-news`, {
        params: {
          symbol: "AAPL",
          from: "2024-09-01",
          to: "2024-09-30",
          token: FINNHUB_API_KEY,
        },
      });

      if (response.data) {
        // Display only 2-3 news articles
        setNews(response.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching stock news:", error);
      message.error("Failed to fetch stock news.");
    }
  };

  // Calculate total portfolio value
  const calculatePortfolioValue = (stocks) => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.totalValue, 0);
    setTotalPortfolioValue(totalValue.toFixed(2));
  };

  // Add stock to portfolio
  const addStockToPortfolio = async (symbol) => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol: symbol,
          token: FINNHUB_API_KEY,
        },
      });

      if (response.data) {
        const stockInfo = {
          name: symbol,
          symbol: symbol,
          currentPrice: response.data.c.toFixed(2),
          highPrice: response.data.h.toFixed(2),
          lowPrice: response.data.l.toFixed(2),
          lastRefreshed: new Date().toLocaleTimeString(),
          quantity: 10, // Sample quantity for calculation
        };

        stockInfo.totalValue = stockInfo.currentPrice * stockInfo.quantity;
        setRealTimeStocks((prev) => [...prev, stockInfo]);
        calculatePortfolioValue([...realTimeStocks, stockInfo]);
      } else {
        message.error(`No data available for ${symbol}.`);
      }
    } catch (error) {
      console.error("Error adding stock to portfolio:", error);
      message.error("Failed to add stock to portfolio. Please try again later.");
    }
  };

  // Function to generate pie chart data
  const generatePieChartData = (stocks) => {
    return stocks.map(stock => ({
      name: stock.name,
      value: stock.totalValue,
    }));
  };

  // Function to get random colors for each stock slice
  const getRandomColor = () => {
    const colors = ['#ff7300', '#387908', '#ff0000', '#0088FE', '#00C49F'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchLiveStockPrices();
    fetchStockNews();
  }, []);

  return (
    <Layout>
      <Content className={styles.content}>
        <section className={styles.investmentsSection}>
          <Title level={2}>Your Investments (Real-Time Stock Prices)</Title>
          <SearchBar onAddStock={addStockToPortfolio} />
          <Table
            dataSource={realTimeStocks}
            rowKey="symbol"
            loading={loading}
            pagination={false}
            bordered
            size="middle"
          >
            <Table.Column title="Stock Name" dataIndex="name" />
            <Table.Column title="Stock Symbol" dataIndex="symbol" />
            <Table.Column
              title="Current Price (USD)"
              dataIndex="currentPrice"
              render={(text) => `$${text}`}
            />
            <Table.Column
              title="High Price (USD)"
              dataIndex="highPrice"
              render={(text) => `$${text}`}
            />
            <Table.Column
              title="Low Price (USD)"
              dataIndex="lowPrice"
              render={(text) => `$${text}`}
            />
            <Table.Column title="Quantity" dataIndex="quantity" />
            <Table.Column title="Total Value (USD)" dataIndex="totalValue" render={(text) => `$${text}`} />
            <Table.Column title="Last Refreshed" dataIndex="lastRefreshed" />
          </Table>

          <Card className={styles.portfolioSummary}>
            <Title level={3}>Portfolio Summary</Title>
            <Text>Total Portfolio Value: ${totalPortfolioValue}</Text>

            <div className={styles.pieChart}>
              <Title level={4}>Portfolio Distribution</Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={generatePieChartData(realTimeStocks)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {realTimeStocks.map((stock, index) => (
                      <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
      </Content>
    </Layout>
  );
};

export default Portfolio;

