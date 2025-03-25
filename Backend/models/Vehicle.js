const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    rentalName: { type: String, required: true },
    driverDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' ,required: false},
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]

});

module.exports = mongoose.model('Vehicle', vehicleSchema);