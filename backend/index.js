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

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Environment variables check:');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('MONGO_URI value:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 50) + '...' : 'NOT SET');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

    if (!process.env.MONGO_URI) {
      console.warn('Warning: MONGO_URI is not set. Using local fallback. Backend API will only work if the local MongoDB instance is available.');
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');

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
