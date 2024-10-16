const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./Routes/auth'); // Ensure this path is correct
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend running on localhost:3000
  methods: 'GET,POST,PUT,DELETE',  // Allow methods you need
  credentials: true,  // Allow cookies (if needed)
}));

app.use(bodyParser.json());

// MongoDB Atlas connection URI
const dbURI = process.env.MONGO_URI;  // Use environment variable for MongoDB URI

// Ensure the MongoDB URI is defined in .env file
if (!dbURI) {
  console.error('MongoDB URI not defined in environment variables');
  process.exit(1);  // Exit the process if MongoDB URI is not defined
}

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the process if connection fails
  });

// Use routes for authentication
app.use('/api/auth', authRoutes);

// Set up the port to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
