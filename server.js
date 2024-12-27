const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const restaurant = require('./routes/restaurantRoutes');
const path = require('path');
require('dotenv').config({ path: './config.env' }); // Ensure .env file is loaded

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS Configuration
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "https://restaurantmgmt-qrcz.onrender.com");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(
  cors({
    origin: 'https://restaurantmgmt-qrcz.onrender.com', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Include credentials if needed
  })
);

// Route for API
app.use('/api', restaurant);

// Basic route for home page
app.get('/home', (req, res) => {
  res.send('Hello Welcome to Our Restaurant Home Page!');
});

// Serve static files
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(
    path.join(__dirname, './frontend/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
