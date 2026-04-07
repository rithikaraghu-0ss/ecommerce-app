require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

// On Render, environment variables are set directly, not from .env file
// So we check if we're on Render and don't use dotenv defaults
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Environment variables check:');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('MONGO_URI value:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 50) + '...' : 'NOT SET - using fallback');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET value:', process.env.JWT_SECRET ? 'SET' : 'NOT SET - using fallback');
    console.log('Final MONGO_URI being used:', MONGO_URI.substring(0, 50) + '...');

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');

    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);

    app.get('/', (req, res) => {
      res.send('E-Commerce API is running!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

startServer();
