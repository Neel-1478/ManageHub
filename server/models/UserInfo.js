const mongoose = require('mongoose');

// Define the UserInfo schema
const UserInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true, // Unique email for each user
    },
    phone: {
        type: String,
        required: true,
    },
    outstandingBalance: {
        type: Number,
        default: 0, // Default value of 0 for outstanding balance
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the UserInfo model
const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
module.exports = UserInfo;
