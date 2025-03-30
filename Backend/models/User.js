const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        fullName: String,
        phoneNumber: String,
        address: String,
        dateOfBirth: Date, // Added dateOfBirth
        licenseNumber: String,
    },
    pastJourneys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

module.exports = mongoose.model('User', userSchema);