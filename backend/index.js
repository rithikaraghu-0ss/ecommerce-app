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
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ecommerceuser:EcommercePass123!@cluster0.mmwsnjm.mongodb.net/ecommerce?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'SecretKey123!ForEcommerce';
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

    // Auto-seed products if database is empty
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Database is empty, seeding sample products...');
      const sampleProducts = [
        {
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=Headphones',
          stock: 50
        },
        {
          name: 'Smart Watch',
          description: 'Fitness tracking smart watch with heart rate monitor',
          price: 299.99,
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
          stock: 30
        },
        {
          name: 'Laptop Backpack',
          description: 'Durable laptop backpack with multiple compartments',
          price: 79.99,
          category: 'Accessories',
          image: 'https://via.placeholder.com/300x200?text=Backpack',
          stock: 25
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with thermal carafe',
          price: 149.99,
          category: 'Appliances',
          image: 'https://via.placeholder.com/300x200?text=Coffee+Maker',
          stock: 15
        },
        {
          name: 'Running Shoes',
          description: 'Comfortable running shoes with advanced cushioning',
          price: 129.99,
          category: 'Sports',
          image: 'https://via.placeholder.com/300x200?text=Running+Shoes',
          stock: 40
        },
        {
          name: 'Bluetooth Speaker',
          description: 'Portable Bluetooth speaker with waterproof design',
          price: 89.99,
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=Speaker',
          stock: 35
        }
      ];
      await Product.insertMany(sampleProducts);
      console.log(`Seeded ${sampleProducts.length} sample products`);
    } else {
      console.log(`Database already has ${productCount} products`);
    }

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
