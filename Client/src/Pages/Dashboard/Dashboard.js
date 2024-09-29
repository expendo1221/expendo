import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Cards from '../../Components/Cards/Cards';
import './Dashboard.css'; // Import the CSS file for Dashboard

export default function Dashboard() {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  const handleAddIncome = (newIncome) => {
    setIncomeEntries([...incomeEntries, newIncome]);
  };

  const handleAddExpense = (newExpense) => {
    setExpenseEntries([...expenseEntries, newExpense]);
  };

  // Reset all entries
  const handleReset = () => {
    setIncomeEntries([]);
    setExpenseEntries([]);
  };

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
        <Table dataSource={incomeEntries} columns={columns} rowKey="key" />
        <h2>Expense Entries</h2>
        <Table dataSource={expenseEntries} columns={columns} rowKey="key" />
      </div>
      <Button onClick={handleReset}>Reset Entries</Button>
    </div>
  );
}

