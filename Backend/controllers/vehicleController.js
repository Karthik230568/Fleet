const Vehicle = require('../models/Vehicle');

// Search for vehicles
const searchVehicles = async (req, res, next) => {
    try {
        const { pickupDate, returnDate, withDriver, city } = req.query;

        // Find available vehicles in the selected city
        const vehicles = await Vehicle.find({
            availability: true,
            city: city, // Filter by city
        }).populate('driverDetails');

        res.status(200).json({ vehicles });
    } catch (error) {
        next(error);
    }
};

module.exports = { searchVehicles };