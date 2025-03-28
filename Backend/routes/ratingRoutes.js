const express = require('express');
const { rateVehicle, rateDriver } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rate vehicle route
router.post('/vehicle', authMiddleware, rateVehicle);

// Rate driver route
router.post('/driver', authMiddleware, rateDriver);

module.exports = router;
