const express = require('express');
const connectDB = require('./config/db');
// const restaurantRoutes = require('./routes/restaurantRoutes'); // Import restaurant routes
const cors = require("cors"); // Import CORS
const restaurant = require("./routes/restaurantRoutes")
const path = require('path');
require('dotenv').config( {path: "./config.env"}); // Ensure .env file is loaded

// Connect to MongoDB
connectDB();

const app = express();



// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
    origin: "*", // Allow all origins temporarily for testing
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true
  }));  // Allow all origins for development
  app.use("/api/restaurant",restaurant)

// Basic route for home page
app.get("/home", (req, res) => {
    res.send("Hello Welcome to Our Restaurant Home Page!");
});

// Use room routes with prefix '/api'
// app.use('/api', restaurantRoutes);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
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