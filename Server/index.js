const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./Database/db'); 

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Expendo API');
});


const server = () => {
    db();  
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
