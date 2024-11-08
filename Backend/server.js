const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
// Allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow cookies to be included in requests
}));

// MongoDB connection
mongoose.connect('mongodb://localhost/TechTitans').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
