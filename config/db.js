const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables
const connectDB = async () => {
    const uri = process.env.DATABASE;
    if (!uri) {
        console.error('DATABASE URI is not defined in the environment variables');
        process.exit(1); // Exit the process if the URI is undefined
      }
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;