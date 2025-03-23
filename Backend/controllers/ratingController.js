const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');

// Submit rating for a vehicle
const rateVehicle = async (req, res, next) => {
    try {
        const { bookingId, rating } = req.body;

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'completed') {
            const error = new Error('Invalid booking');
            error.statusCode = 404;
            throw error;
        }

        // Fetch vehicle details
        const vehicle = await Vehicle.findById(booking.vehicle);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        // Update vehicle rating
        vehicle.rating = (vehicle.rating + rating) / 2; // Average rating
        await vehicle.save();

        res.status(200).json({ message: 'Vehicle rated successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Submit rating for a driver
const rateDriver = async (req, res, next) => {
    try {
        const { bookingId, rating } = req.body;

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'completed') {
            const error = new Error('Invalid booking');
            error.statusCode = 404;
            throw error;
        }

        // Fetch driver details
        const driver = await Driver.findById(booking.driverDetails);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        // Update driver rating
        driver.rating = (driver.rating + rating) / 2; // Average rating
        await driver.save();

        res.status(200).json({ message: 'Driver rated successfully', driver });
    } catch (error) {
        next(error);
    }
};

module.exports = { rateVehicle, rateDriver };