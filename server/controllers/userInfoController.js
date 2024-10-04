const UserInfo = require('../models/UserInfo'); // Import the UserInfo model

// Add new user information
const addUserInfo = async (req, res) => {
    const { name, email, phone, balance } = req.body; // Destructure request body
    const outstandingBalance=balance;
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        const newUserInfo = new UserInfo({
            name,
            email,
            phone,
            outstandingBalance: outstandingBalance ?? 0, // If no balance provided, use default value 0
            createdBy: userId // Set the createdBy field
        });

        await newUserInfo.save(); // Save user info to the database
        res.status(201).json({ message: 'User information added successfully', userInfo: newUserInfo });
    } catch (error) {
        console.error('Error adding user info:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate email entry' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all user information for the authenticated user
const getUserInfo = async (req, res) => {
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        const userInfoList = await UserInfo.find({ createdBy: userId }); // Find user info created by this user
        res.status(200).json(userInfoList); // Return the user info list
    } catch (error) {
        console.error('Error retrieving user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user information by ID
const getUserInfoById = async (req, res) => {
    const { id } = req.params; // Get ID from request params
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        const userInfo = await UserInfo.findOne({ _id: id, createdBy: userId }); // Find user info by ID and createdBy

        if (!userInfo) {
            return res.status(404).json({ message: 'User information not found' });
        }
        res.status(200).json(userInfo); // Return the found user info
    } catch (error) {
        console.error('Error retrieving user info by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit user information
const updateUserInfo = async (req, res) => {
    const { id } = req.params; // Get ID from request params
    const { name, email, phone, outstandingBalance } = req.body; // Destructure request body

    try {
        const updatedUserInfo = await UserInfo.findOneAndUpdate(
            { _id: id, createdBy: req.user.id }, // Find user info by ID and createdBy
            { 
              name, 
              email, 
              phone, 
              outstandingBalance: outstandingBalance ?? 0 // If no balance provided, use default value 0 
            },
            { new: true } // Return the updated document
        );

        if (!updatedUserInfo) {
            return res.status(404).json({ message: 'User information not found' });
        }
        res.status(200).json({ message: 'User information updated successfully', userInfo: updatedUserInfo });
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user information
const deleteUserInfo = async (req, res) => {
    const { id } = req.params; // Get ID from request params

    try {
        const deletedUserInfo = await UserInfo.findOneAndDelete({ _id: id, createdBy: req.user.id }); // Delete user info by ID and createdBy

        if (!deletedUserInfo) {
            return res.status(404).json({ message: 'User information not found' });
        }
        res.status(200).json({ message: 'User information deleted successfully' });
    } catch (error) {
        console.error('Error deleting user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    addUserInfo,
    getUserInfo,
    getUserInfoById, // Export the new function
    updateUserInfo,
    deleteUserInfo,
};
