const mongoose = require('mongoose');

// Define the Invoice schema
const InvoiceSchema = new mongoose.Schema({
  userInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo', // Reference to the UserInfo model
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory', // Reference to the Inventory model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number, // Optional discount field
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['cash', 'check'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Invoice model
const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
