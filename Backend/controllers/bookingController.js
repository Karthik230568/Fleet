const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const { calculateTotalPayment } = require('../utils/calculatePayment');

// Create a new booking
const createBooking = async (req, res, next) => {
    try {
        const { vehicle, pickupDate, returnDate, pickupLocation, city, withDriver } = req.body;

        // Fetch vehicle details
        const selectedVehicle = await Vehicle.findById(vehicle);
        if (!selectedVehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        // Calculate total payment
        const totalPayment = calculateTotalPayment(selectedVehicle.pricePerDay, pickupDate, returnDate);

        // Create booking
        const booking = new Booking({
            user: req.user.userId,
            vehicle,
            pickupDate,
            returnDate,
            pickupLocation,
            city,
            withDriver,
            totalPayment, // Add total payment to the booking
        });

        await booking.save();

        // Update vehicle availability
        selectedVehicle.availability = false;
        await selectedVehicle.save();

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        next(error);
    }
};

module.exports = { createBooking };