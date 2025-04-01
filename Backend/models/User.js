const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: ''
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);