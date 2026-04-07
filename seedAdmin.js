require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    const email = 'admin@ecommerce.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin user already exists:', email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const admin = new User({
      name: 'Admin User',
      email,
      password: hashedPassword,
      isAdmin: true
    });
    await admin.save();
    console.log('Admin user created:');
    console.log('Email:', email);
    console.log('Password: Admin123!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
