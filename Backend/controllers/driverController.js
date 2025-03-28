const Driver = require('../models/Driver');

// Add a new driver (Admin only)
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

// Remove a driver (Admin only)
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

// Get all drivers
const getDrivers = async (req, res, next) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({ drivers });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addDriver,
    removeDriver,
    getDrivers,
};
