import React, { useState, useEffect } from "react";
import { Layout, Button, Card, Row, Col, Slider, Select, Table } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";
import io from "socket.io-client"; // WebSocket
import styles from "./Portfolio.module.css"; // CSS Module for custom styling

const { Header, Content, Footer } = Layout;
const { Option } = Select;

// Mock data for Portfolio Comparison
const portfolioPerformance = [
  { name: 'Jan', portfolio: 5, sp500: 3 },
  { name: 'Feb', portfolio: 8, sp500: 6 },
  { name: 'Mar', portfolio: 12, sp500: 9 },
  { name: 'Apr', portfolio: 10, sp500: 8 },
  { name: 'May', portfolio: 15, sp500: 13 },
];

// Mock data for Pie Chart (Asset Allocation)
const data = [
  { name: "Stocks", value: 40 },
  { name: "Bonds", value: 20 },
  { name: "Real Estate", value: 15 },
  { name: "Commodities", value: 10 },
  { name: "Cash", value: 5 },
  { name: "Mutual Funds", value: 5 },
  { name: "ETFs", value: 3 },
  { name: "Art", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699", "#339933", "#FF33FF", "#9933FF"];

// Mock data for Peer Comparison
const peerPerformance = {
  lowRisk: [
    { name: 'Jan', portfolio: 3, peer: 5 },
    { name: 'Feb', portfolio: 4, peer: 6 },
    { name: 'Mar', portfolio: 6, peer: 7 },
  ],
  highRisk: [
    { name: 'Jan', portfolio: 10, peer: 12 },
    { name: 'Feb', portfolio: 12, peer: 15 },
    { name: 'Mar', portfolio: 15, peer: 18 },
  ]
};

// Initial investments
const initialInvestments = [
  { stock: "TATA", investedAmount: 10000, shares: 50, dailyReadings: [240, 245, 250, 255, 260] },
  { stock: "IREDA", investedAmount: 5000, shares: 30, dailyReadings: [180, 185, 190, 195, 200] },
  { stock: "IRFC", investedAmount: 8000, shares: 40, dailyReadings: [210, 215, 220, 225, 230] },
];

// WebSocket setup for real-time updates
const socket = io("https://your-websocket-api-endpoint");

const Portfolio = () => {
  const [riskLevel, setRiskLevel] = useState(5);
  const [goalAmount, setGoalAmount] = useState(100000);
  const [selectedRisk, setSelectedRisk] = useState("lowRisk");
  const [investments, setInvestments] = useState(initialInvestments);
  const [realTimeStocks, setRealTimeStocks] = useState([]);

  // Function to calculate performance
  const calculatePerformance = () => {
    return investments.map(investment => {
      const currentPrice = investment.dailyReadings[investment.dailyReadings.length - 1]; // Get the last day's price
      const totalValue = currentPrice * investment.shares;
      const profitLoss = totalValue - investment.investedAmount;
      return { ...investment, currentPrice, totalValue, profitLoss };
    });
  };

  const performanceData = calculatePerformance();

  // Handle risk level change
  const handleRiskChange = (value) => {
    setRiskLevel(value);
  };

  // Handle goal amount change
  const handleGoalChange = (value) => {
    setGoalAmount(value);
  };

  // Handle peer comparison risk selection
  const handlePeerRiskChange = (value) => {
    setSelectedRisk(value);
  };

  // WebSocket for real-time stock updates
  useEffect(() => {
    socket.on("stockData", (data) => {
      setRealTimeStocks(data);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  // Polling for real-time stock updates as an alternative to WebSockets
  // Uncomment this section if your API doesn't support WebSockets
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const response = await axios.get("https://api.yourstockservice.com/prices");
        setRealTimeStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Content className={styles.content}>
        {/* Real-time Stock Prices Table */}
        <section className={styles.investmentsSection}>
          <h2>Your Investments (Real-Time)</h2>
          <Table dataSource={realTimeStocks} rowKey="stock">
            <Table.Column title="Stock" dataIndex="stock" />
            <Table.Column title="Current Price" dataIndex="currentPrice" render={price => `$${price.toFixed(2)}`} />
          </Table>
        </section>

        {/* Portfolio Investments Table */}
        <section className={styles.investmentsSection}>
          <h2>Your Investments</h2>
          <Table dataSource={performanceData} rowKey="stock">
            <Table.Column title="Stock" dataIndex="stock" />
            <Table.Column title="Invested Amount" dataIndex="investedAmount" render={amount => `$${amount.toLocaleString()}`} />
            <Table.Column title="Current Price" dataIndex="currentPrice" render={price => `$${price.toFixed(2)}`} />
            <Table.Column title="Total Value" dataIndex="totalValue" render={value => `$${value.toLocaleString()}`} />
            <Table.Column title="Profit/Loss" dataIndex="profitLoss" render={loss => `$${loss.toLocaleString()}`} />
          </Table>
        </section>

        {/* Asset Allocation Cards */}
        <section className={styles.portfolioSection}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card title="Stocks" className={styles.assetCard}>
                <p>40% of Portfolio</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card title="Bonds" className={styles.assetCard}>
                <p>20% of Portfolio</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card title="Real Estate" className={styles.assetCard}>
                <p>15% of Portfolio</p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Asset Allocation Pie Chart */}
        <section className={styles.chartSection}>
          <h2>Asset Allocation</h2>
          <PieChart width={400} height={400}>
            <Pie data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </section>

        {/* Financial Goals and Risk Management */}
        <section className={styles.goalSection}>
          <h2>Financial Goals & Risk Management</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12}>
              <Card title="Adjust Risk Level" className={styles.assetCard}>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={riskLevel}
                  onChange={handleRiskChange}
                />
                <p>Current Risk Level: {riskLevel}</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <Card title="Set Financial Goal" className={styles.assetCard}>
                <Slider
                  min={50000}
                  max={500000}
                  step={10000}
                  value={goalAmount}
                  onChange={handleGoalChange}
                />
                <p>Financial Goal: ${goalAmount.toLocaleString()}</p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Portfolio vs S&P 500 Comparison */}
        <section className={styles.comparisonSection}>
          <h2>Portfolio vs. S&P 500</h2>
          <LineChart
            width={600}
            height={300}
            data={portfolioPerformance}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="portfolio" stroke="#8884d8" />
            <Line type="monotone" dataKey="sp500" stroke="#82ca9d" />
          </LineChart>
        </section>

        {/* Peer Comparison */}
        <section className={styles.peerSection}>
          <h2>Peer Performance Comparison</h2>
          <Select defaultValue="lowRisk" style={{ width: 120 }} onChange={handlePeerRiskChange}>
            <Option value="lowRisk">Low Risk</Option>
            <Option value="highRisk">High Risk</Option>
          </Select>
          <LineChart
            width={600}
            height={300}
            data={peerPerformance[selectedRisk]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="portfolio" stroke="#8884d8" />
            <Line type="monotone" dataKey="peer" stroke="#82ca9d" />
          </LineChart>
        </section>
        </Content>
      <Footer className={styles.footer}>© 2024 Your Portfolio App</Footer>
    </Layout>
  );
};

export default Portfolio;