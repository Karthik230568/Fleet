const express = require('express');
const { rateVehicle, rateDriver } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rate a vehicle
router.post('/vehicle', authMiddleware, rateVehicle);

// Rate a driver
router.post('/driver', authMiddleware, rateDriver);

module.exports = router;