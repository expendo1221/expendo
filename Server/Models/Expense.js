const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expenses', ExpenseSchema);
