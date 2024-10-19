const express = require('express');
const router = express.Router();
const Income = require('../Models/Income');

// Fetch all income entries
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new income entry
router.post('/', async (req, res) => {
  const { source, amount, date } = req.body; // Ensure date is provided
  const income = new Income({ source, amount, date });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an income entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income entry not found' });
    }
    res.json({ message: 'Income entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
