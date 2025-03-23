const Vehicle = require('../models/Vehicle');

// Search for vehicles
const searchVehicles = async (req, res, next) => {
    try {
        const { pickupDate, returnDate, withDriver, city } = req.query;

        // Find available vehicles
        const vehicles = await Vehicle.find({
            availability: true,
            city: city,
            ...(withDriver === 'true' && { driverDetails: { $exists: true, $ne: null } }), // Only show vehicles with drivers if "withDriver" is true
        }).populate('driverDetails');

        res.status(200).json({ vehicles });
    } catch (error) {
        next(error);
    }
};

// Get vehicle details by ID
const getVehicleDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find vehicle by ID
        const vehicle = await Vehicle.findById(id).populate('driverDetails');
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ vehicle });
    } catch (error) {
        next(error);
    }
};

module.exports = { searchVehicles, getVehicleDetails };