require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

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

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully!');

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log(`Database already has ${existingProducts} products. Skipping seed.`);
      process.exit(0);
    }

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${sampleProducts.length} products!`);

    // List the products
    const products = await Product.find({});
    console.log('Products in database:');
    products.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seedProducts();