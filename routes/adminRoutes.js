// routes/adminRoutes.js
const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/adminController');

const router = express.Router();

// Route to fetch all products
router.get('/products', getAllProducts);

// Route to fetch a single product by ID
router.get('/products/:id', getProductById);

module.exports = router;
