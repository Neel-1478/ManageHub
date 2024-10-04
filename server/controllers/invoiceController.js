const Invoice = require('../models/Invoice'); // Import the Invoice model
const { updateInventoryQuantity } = require('../utils/inventoryUtils'); // Import the utility function

// Add a new invoice
const addInvoice = async (req, res) => {
    const { userInfoId, products, totalAmount, paymentType, paymentStatus } = req.body; // Destructure request body
    // const userId = req.user.id; // Get the authenticated user's ID

    try {
        const newInvoice = new Invoice({
            userInfoId, // Link to UserInfo ID
            products,
            totalAmount,
            paymentType,
            paymentStatus,
            // createdBy: userId, // Set the createdBy field
        });

        await newInvoice.save(); // Save the invoice to the database

        // Update inventory based on the products sold
        await updateInventoryQuantity(products, -1); // Decrease inventory for sold items

        res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an invoice
const updateInvoice = async (req, res) => {
    const { id } = req.params; // Get ID from request params
    const { userInfoId, products, totalAmount, paymentType, paymentStatus } = req.body; // Destructure request body

    try {
        const existingInvoice = await Invoice.findById(id);

        if (!existingInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Update inventory for the existing products
        await updateInventoryQuantity(existingInvoice.products, 1); // Increase inventory for previous items

        // Update the invoice
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            { userInfoId, products, totalAmount, paymentType, paymentStatus },
            { new: true } // Return the updated document
        );

        // Update inventory for the new products
        await updateInventoryQuantity(products, -1); // Decrease inventory for new items

        res.status(200).json({ message: 'Invoice updated successfully', invoice: updatedInvoice });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
    const { id } = req.params; // Get ID from request params

    try {
        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Update inventory based on the products in the invoice
        await updateInventoryQuantity(invoice.products, 1); // Increase inventory for deleted items

        await Invoice.findByIdAndDelete(id); // Delete the invoice from the database

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all invoices for the authenticated user with limited details
// Get all invoices for a specific userInfoId with limited details
const getInvoices = async (req, res) => {
  const { userInfoId } = req.query; // Get userInfoId from query parameters

  console.log("Inside getInvoices");

  if (!userInfoId) {
      return res.status(400).json({ message: 'userInfoId is required' });
  }

  try {
      const invoices = await Invoice.find({ userInfoId }); // Find invoices linked to the specified userInfoId
      const limitedInvoices = invoices.map(invoice => ({
          id: invoice._id,
          userInfoId: invoice.userInfoId,
          createdAt: invoice.createdAt,
          totalAmount: invoice.totalAmount,
          paymentType: invoice.paymentType,
          paymentStatus: invoice.paymentStatus,
      }));

      res.status(200).json(limitedInvoices); // Return the limited invoice details
  } catch (error) {
      console.error('Error retrieving invoices:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Get a specific invoice by ID with all details
const getInvoiceById = async (req, res) => {
    const { id } = req.params; // Get ID from request params

    try {
        const invoice = await Invoice.findById(id).populate('products.productId'); // Populate product details

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(invoice); // Return the complete invoice details
    } catch (error) {
        console.error('Error retrieving invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoices,
    getInvoiceById,
};
