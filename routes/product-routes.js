const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller'); // Import the controller

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Get all products
router.get('/products', productController.getAllProducts);

// Get product by ID
router.get('/product/:productId', productController.getProductById);

// POST request to handle product views or cart adds
router.post('/products/view', productController.viewProduct);

// POST request to add a product
router.post('/products', upload.single('image'), productController.addProduct); // Use the addProduct method from controller

module.exports = router;
