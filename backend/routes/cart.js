const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [{ product: productId, quantity }] });
    } else {
      const existingItem = cart.items.find((item) => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/item/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
