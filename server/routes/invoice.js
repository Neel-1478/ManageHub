const express = require('express');
const router = express.Router();
const { addInvoice, getInvoiceById, updateInvoice, deleteInvoice, getInvoices } = require('../controllers/invoiceController');

// Create a new invoice
router.post('/', addInvoice);

// Get all invoices for a specific user with limited details
router.get('/', getInvoices);

// Update an existing invoice
router.put('/:id', updateInvoice);

// Delete an existing invoice
router.delete('/:id', deleteInvoice);

router.get('/:id', getInvoiceById);

module.exports = router;
