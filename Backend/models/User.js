const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        fullName: String,
        address: String,
        dateOfBirth: Date, // Added dateOfBirth
        licenseNumber: String,
    },
    pastJourneys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

module.exports = mongoose.model('User', userSchema);