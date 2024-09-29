import React, { useState } from 'react';
import styles from './Cards.module.css'; 
import { Card, Row, Button, Modal, Input, Form, Select } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const { Option } = Select;

export default function Cards({ incomeEntries, expenseEntries, onAddIncome, onAddExpense }) {
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState('');

  const showIncomeModal = () => setIncomeModalVisible(true);
  const showExpenseModal = () => setExpenseModalVisible(true);

  const handleIncomeModalOk = (values) => {
    const { amount, source } = values;
    const newIncome = {
      key: Date.now(),
      source,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };
    onAddIncome(newIncome);
    setIncomeModalVisible(false);
  };

  const handleExpenseModalOk = (values) => {
    const { amount, category } = values;
    const newExpense = {
      key: Date.now(),
      source: values.source,
      category,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };
    onAddExpense(newExpense);
    setExpenseModalVisible(false);
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

  const chartData = incomeEntries.map((income, index) => ({
    date: income.date,
    income: income.amount,
    expenses: expenseEntries[index]?.amount || 0,
  }));


  const COLORS = [
    '#FF6384', 
    '#36A2EB', 
    '#FFCE56', 
    '#4BC0C0', 
    '#9966FF', 
    '#FF9F40', 
    '#FF5C8D', 
    '#5C8DFF', 
    '#FFA07A', 
    '#FFD700', 
    '#20B2AA', 
    '#9370DB', 
    '#FF4500',
    '#ADFF2F', 
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
              {
                pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
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
              {
                categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
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
            <Line type="monotone" dataKey="income" stroke="#82ca9d" />
            <Line type="monotone" dataKey="expenses" stroke="#ff6384" />
          </LineChart>
        </Card>
      </Row>

      <Modal
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleIncomeModalOk}>
          <Form.Item name="source" rules={[{ required: true, message: 'Please input the source of income!' }]}>
            <Input placeholder="Source of Income" />
          </Form.Item>
          <Form.Item name="amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
            <Input placeholder="Amount" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Income</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleExpenseModalOk}>
          <Form.Item name="source" rules={[{ required: true, message: 'Please input the source of expense!' }]}>
            <Input placeholder="Source of Expense" />
          </Form.Item>
          <Form.Item name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select
              placeholder="Select a category"
              onChange={setExpenseCategory}
              defaultValue={expenseCategory}
            >
              <Option value="Food">Food</Option>
              <Option value="Transportation">Transportation</Option>
              <Option value="Utilities">Utilities</Option>
              <Option value="Entertainment">Entertainment</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
            <Input placeholder="Amount" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Expense</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

