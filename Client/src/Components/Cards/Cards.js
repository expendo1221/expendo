 import React, { useState, useEffect } from 'react';
import styles from './Cards.module.css';
import { Card, Row, Button, Modal, Input, Form, Select, message } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';

const { Option } = Select;

export default function Cards({ onAddIncome, onAddExpense }) {
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState('');

  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  // Fetch Income and Expense data from backend on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const incomeResponse = await axios.get('http://localhost:5000/api/incomes');
        const expenseResponse = await axios.get('http://localhost:5000/api/expenses');
        setIncomeEntries(incomeResponse.data);
        setExpenseEntries(expenseResponse.data);
      } catch (error) {
        message.error('Failed to load data');
      }
    }

    fetchData();
  }, []);

  const showIncomeModal = () => setIncomeModalVisible(true);
  const showExpenseModal = () => setExpenseModalVisible(true);

  const handleIncomeModalOk = async (values) => {
    const { amount, source } = values;
    const newIncome = {
      source,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/incomes', newIncome);  // Post new income to backend
      setIncomeEntries([...incomeEntries, response.data]);
      onAddIncome(response.data);
      setIncomeModalVisible(false);
      message.success('Income added successfully');
    } catch (error) {
      message.error('Failed to add income');
    }
  };

  const handleExpenseModalOk = async (values) => {
    const { amount, source, category } = values;
    const newExpense = {
      source,
      category,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);  // Post new expense to backend
      setExpenseEntries([...expenseEntries, response.data]);
      onAddExpense(response.data);
      setExpenseModalVisible(false);
      message.success('Expense added successfully');
    } catch (error) {
      message.error('Failed to add expense');
    }
  };

  const handleModalCancel = () => {
    setIncomeModalVisible(false);
    setExpenseModalVisible(false);
  };

  const totalIncome = incomeEntries.reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = expenseEntries.reduce((acc, entry) => acc + entry.amount, 0);
  const currentBalance = totalIncome - totalExpenses;
  const savings = currentBalance > 0 ? currentBalance : 0;

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
  ];

  const categories = [...new Set(expenseEntries.map(entry => entry.category))];
  const categoryData = categories.map(category => ({
    name: category,
    value: expenseEntries
      .filter(entry => entry.category === category)
      .reduce((acc, entry) => acc + entry.amount, 0),
  }));

  const chartData = incomeEntries.map((income) => {
    const expense = expenseEntries.find(exp => exp.date === income.date);
    return {
      date: income.date,
      income: income.amount,
      expenses: expense ? expense.amount : 0,
    };
  });

  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF5C8D', '#5C8DFF', '#FFA07A', '#FFD700',
    '#20B2AA', '#9370DB', '#FF4500', '#ADFF2F',
  ];

  return (
    <div>
      <Row className={styles['cards-container']}>
        <Card className={styles['cards-my-card']} title="Current Balance">
          <p>₹{currentBalance}</p>
        </Card>
        <Card className={styles['cards-my-card']} title="Add Income">
          <Button className={styles['cards-my-btn']} onClick={showIncomeModal}>Add income</Button>
        </Card>
        <Card className={styles['cards-my-card']} title="Add Expense">
          <Button className={styles['cards-my-btn']} onClick={showExpenseModal}>Add expense</Button>
        </Card>
        <Card className={styles['cards-my-card']} title="Savings">
          <p>₹{savings}</p>
        </Card>
      </Row>

      <Row className={styles['charts-container']}>
        <Card className={styles['pie-chart-card']} title="Income vs Expenses">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={entry => entry.name}
              outerRadius={80}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card className={styles['pie-chart-card']} title="Expenses by Category">
          <PieChart width={400} height={400}>
            <Pie
              data={categoryData}
              cx={200}
              cy={200}
              labelLine={false}
              label={entry => entry.name}
              outerRadius={80}
              fill="#8884d8"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card className={styles['line-chart-card']} title="Income and Expenses Over Time">
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expenses" stroke="#ff6f61" />
          </LineChart>
        </Card>
      </Row>

      {/* Add Income Modal */}
      <Modal
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleIncomeModalOk}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Source" name="source" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleExpenseModalOk}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Source" name="source" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select defaultValue={expenseCategory} onChange={setExpenseCategory}>
              <Option value="Food">Food</Option>
              <Option value="Entertainment">Entertainment</Option>
              <Option value="Transport">Transport</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
