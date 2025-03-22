const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    city: { type: String, required: true }, // New field for city
    withDriver: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    paymentIntentId: { type: String },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' },
});

module.exports = mongoose.model('Booking', bookingSchema);