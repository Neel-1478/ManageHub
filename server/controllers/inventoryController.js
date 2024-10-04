const Inventory = require('../models/Inventory'); // Import the Inventory model

// Add a new product
const addProduct = async (req, res) => {
    const { name, description, price, stockQuantity,itemsSold } = req.body; // Destructure request body
    const userId = req.user.id; // Get the authenticated user's ID
  
    // Validate input
    if (!name || !price || !stockQuantity) {
      return res.status(400).json({ message: 'Name, price, and stock quantity are required.' });
    }

    try {
      const newProduct = new Inventory({ 
        name, 
        description, 
        price, 
        stockQuantity,
        itemsSold, 
        createdBy: userId // Set the createdBy field
      });
  
      await newProduct.save(); // Save product to the database
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Retrieve all products created by the authenticated user with sorting functionality
const getAllProducts = async (req, res) => {
  const { name, minPrice, maxPrice, minStock, maxStock, sortBy, sortOrder } = req.query; // Get filters and sorting from query parameters
  const userId = req.user.id; // Get the authenticated user's ID

  // Create a filter object based on the query parameters
  const filters = { createdBy: userId }; // Filter by createdBy

  if (name) {
    filters.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  }
  if (minPrice) {
    filters.price = { $gte: Number(minPrice) }; // Filter for minimum price
  }
  if (maxPrice) {
    filters.price = { ...filters.price, $lte: Number(maxPrice) }; // Filter for maximum price
  }
  if (minStock) {
    filters.stockQuantity = { $gte: Number(minStock) }; // Filter for minimum stock
  }
  if (maxStock) {
    filters.stockQuantity = { ...filters.stockQuantity, $lte: Number(maxStock) }; // Filter for maximum stock
  }

  // Determine sorting logic
  const sortOptions = {};
  if (sortBy) {
    const sortFields = ['itemsSold', 'price', 'stockQuantity']; // Allowed fields for sorting
    if (sortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1; // Ascending or descending
    }
  }

  try {
    const products = await Inventory.find(filters).sort(sortOptions); // Find products based on filters and sorting
    res.status(200).json(products); // Return filtered and sorted products
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Get ID from request params

  try {
    const product = await Inventory.findOne({ _id: id, createdBy: req.user.id }); // Find product by ID and createdBy
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product); // Return product details
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params; // Get ID from request params
  const { name, description, price, stockQuantity, itemsSold } = req.body; // Destructure request body

  try {
    const updatedProduct = await Inventory.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // Find product by ID and createdBy
      { name, description, price, stockQuantity, itemsSold }, // Update all relevant fields
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get ID from request params

  try {
    const deletedProduct = await Inventory.findOneAndDelete({ _id: id, createdBy: req.user.id }); // Delete product by ID and createdBy
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
