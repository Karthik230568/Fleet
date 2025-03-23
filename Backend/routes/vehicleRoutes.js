const express = require('express');
const { searchVehicles, getVehicleDetails } = require('../controllers/vehicleController');
const router = express.Router();

// Search for vehicles
router.get('/search', searchVehicles);

// Get vehicle details by ID
router.get('/:id', getVehicleDetails);

module.exports = router;