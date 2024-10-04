const Transaction = require('../models/Transaction');
const UserInfo = require('../models/UserInfo');

// Add new transaction
const addTransaction = async (req, res) => {
    const { transactionId, amount, paymentType, paymentStatus, userInfoId } = req.body;

    try {
        // Check if the userInfo exists
        const userInfo = await UserInfo.findById(userInfoId);
        if (!userInfo) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTransaction = new Transaction({
            transactionId,
            amount,
            paymentType,
            paymentStatus,
            userInfo: userInfoId,
        });

        await newTransaction.save();
        res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific user
const getTransactionsByUser = async (req, res) => {
    const { userInfoId } = req.params;

    try {
        const transactions = await Transaction.find({ userInfo: userInfoId });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { amount, paymentType, paymentStatus } = req.body;

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, paymentType, paymentStatus },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    addTransaction,
    getTransactionsByUser,
    updateTransaction,
    deleteTransaction,
};
