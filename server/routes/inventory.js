const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/inventoryController'); // Import controller methods
const verifyToken = require('../middleware/authMiddleware'); // Import the token verification middleware
const router = express.Router();

// Protected routes
router.post('/', verifyToken, addProduct); // Add a new product
router.get('/', verifyToken, getAllProducts); // Retrieve all products
router.get('/:id', verifyToken, getProductById); // Get a specific product
router.put('/:id', verifyToken, updateProduct); // Update a product
router.delete('/:id', verifyToken, deleteProduct); // Delete a product

module.exports = router;
