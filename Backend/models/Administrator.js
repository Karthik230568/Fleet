const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin',
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

module.exports = mongoose.model('Administrator', administratorSchema);