const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /api/products — Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, mainImage, images, showOnMain, category, price, description } = req.body;

    const product = new Product({
      name,
      mainImage,
      images,
      showOnMain,
      category,
      price,
      description,
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: '✅ Product added successfully', product: savedProduct });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to add product', error: err.message });
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch products', error: err.message });
  }
});

// GET products to show on Home page
router.get('/home', async (req, res) => {
  try {
    const mainProducts = await Product.find({ showOnMain: true });
    res.json(mainProducts);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch main products', error: err.message });
  }
});

// GET by category
router.get('/spices', async (req, res) => {
  try {
    const spices = await Product.find({ category: 'spices' });
    res.json(spices);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch spices', error: err.message });
  }
});

router.get('/herbs', async (req, res) => {
  try {
    const herbs = await Product.find({ category: 'herbs' });
    res.json(herbs);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch herbs', error: err.message });
  }
});

router.get('/seasonings', async (req, res) => {
  try {
    const seasonings = await Product.find({ category: 'seasonings' });
    res.json(seasonings);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch seasonings', error: err.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch product', error: err.message });
  }
});

module.exports = router;
