const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
