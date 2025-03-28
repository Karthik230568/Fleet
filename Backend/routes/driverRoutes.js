const express = require('express');
const {
    addDriver,
    removeDriver,
    getDrivers,
} = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new driver (Admin only)
router.post('/', authMiddleware, addDriver);

// Remove a driver (Admin only)
router.delete('/:id', authMiddleware, removeDriver);

// Get all drivers
router.get('/', authMiddleware, getDrivers);

module.exports = router;