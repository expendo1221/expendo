import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import Cards from '../../Components/Cards/Cards';
import './Dashboard.css';

export default function Dashboard() {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  // Fetch income and expense data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/incomes'),
          axios.get('http://localhost:5000/api/expenses'),
        ]);
        setIncomeEntries(incomeResponse.data);
        setExpenseEntries(expenseResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        message.error('Error fetching data from server');
      }
    };
    fetchData();
  }, []);

  // Add income entry
  const handleAddIncome = async (newIncome) => {
    try {
      const response = await axios.post('http://localhost:5000/api/incomes', newIncome);
      setIncomeEntries((prev) => [...prev, response.data]);
      message.success('Income added successfully');
    } catch (err) {
      console.error('Error adding income:', err);
      message.error('Error adding income');
    }
  };

  // Add expense entry
  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
      setExpenseEntries((prev) => [...prev, response.data]);
      message.success('Expense added successfully');
    } catch (err) {
      console.error('Error adding expense:', err);
      message.error('Error adding expense');
    }
  };

  // Reset all entries (income and expenses)
  const handleReset = async () => {
    try {
      await axios.delete('http://localhost:5000/api/reset');
      setIncomeEntries([]);  // Reset the state
      setExpenseEntries([]); // Reset the state
      message.success('All entries have been reset');
    } catch (err) {
      console.error('Error resetting entries:', err);
      message.error('Error resetting entries');
    }
  };

  // Define table columns
  const columns = [
    { title: 'Source', dataIndex: 'source', key: 'source' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div className="dashboard">
      <Cards
        incomeEntries={incomeEntries}
        expenseEntries={expenseEntries}
        onAddIncome={handleAddIncome}
        onAddExpense={handleAddExpense}
      />
      <div className="entries-table">
        <h2>Income Entries</h2>
        <Table
          dataSource={incomeEntries}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
        <h2>Expense Entries</h2>
        <Table
          dataSource={expenseEntries}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
      <div className="reset-button">
        <Button onClick={handleReset} danger>
          Reset Entries
        </Button>
      </div>
    </div>
  );
}

