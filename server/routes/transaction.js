const express = require('express');
const router = express.Router();
const {
    addTransaction,
    getTransactionsByUser,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');

// Route to add a new transaction
router.post('/', addTransaction);

// Route to get all transactions for a specific user
router.get('/user/:userInfoId', getTransactionsByUser);

// Route to update a transaction
router.put('/:id', updateTransaction);

// Route to delete a transaction
router.delete('/:id', deleteTransaction);

module.exports = router;
