const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
