const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');

// Add a new vehicle
const addVehicle = async (req, res, next) => {
    try {
        const { name, image, pricePerDay, rentalName, driverDetails } = req.body;

        const vehicle = new Vehicle({
            name,
            image,
            pricePerDay,
            rentalName,
            driverDetails,
        });

        await vehicle.save();

        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Remove a vehicle
const removeVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Vehicle removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Add a new driver
const addDriver = async (req, res, next) => {
    try {
        const { name, licenseNumber, contact } = req.body;

        const driver = new Driver({
            name,
            licenseNumber,
            contact,
        });

        await driver.save();

        res.status(201).json({ message: 'Driver added successfully', driver });
    } catch (error) {
        next(error);
    }
};

// Remove a driver
const removeDriver = async (req, res, next) => {
    try {
        const { id } = req.params;

        const driver = await Driver.findByIdAndDelete(id);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Driver removed successfully' });
    } catch (error) {
        next(error);
    }
};

// View bookings by date
const viewBookingsByDate = async (req, res, next) => {
    try {
        const { date } = req.query;

        const bookings = await Booking.find({
            pickupDate: { $lte: new Date(date) },
            returnDate: { $gte: new Date(date) },
        }).populate('vehicle user');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

module.exports = { addVehicle, removeVehicle, addDriver, removeDriver, viewBookingsByDate };