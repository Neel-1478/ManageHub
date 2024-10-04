// utils/inventoryUtils.js

const Inventory = require('../models/Inventory');

// Function to update inventory quantity
const updateInventoryQuantity = async (products, adjustment) => {
    for (const item of products) {
        // console.log("Inside helper function");
        // console.log(item.productId);
        // console.log(adjustment);
        // console.log(item.quantity);
        await Inventory.findByIdAndUpdate(
            item.productId,
            { $inc: { stockQuantity: adjustment * item.quantity } } // Adjust inventory
        );
        // console.log(item.quantity);
        // console.log("updated");
        const product = await Inventory.findById(item.productId);
        // console.log(product);
    }
};

module.exports = { updateInventoryQuantity };
