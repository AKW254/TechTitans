const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
};
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Allow requests from React frontend

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
