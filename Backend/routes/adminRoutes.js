const express = require('express');
const router = express.Router();
const {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle,
    getAllBookings,
    viewBookingsByDate,
    addDriver,
    removeDriver,
    getDrivers,
    getDriverProfile,
    updateDriverProfile
} = require('../controllers/adminController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// Vehicle routes
router.get('/vehicles', authenticateUser, authenticateAdmin, getAllVehicles);
router.post('/vehicles', authenticateUser, authenticateAdmin, addVehicle);
router.put('/vehicles/:id', authenticateUser, authenticateAdmin, updateVehicle);
router.delete('/vehicles/:id', authenticateUser, authenticateAdmin, removeVehicle);

// Driver routes
router.post('/drivers', authenticateUser, authenticateAdmin, addDriver);
router.delete('/drivers/:id', authenticateUser, authenticateAdmin, removeDriver);
router.get('/drivers', authenticateUser, authenticateAdmin, getDrivers);
router.get('/drivers/profile', authenticateUser, getDriverProfile);
router.put('/drivers/profile', authenticateUser, updateDriverProfile);

// Booking routes
router.get('/bookings', authenticateUser, authenticateAdmin, getAllBookings);
router.get('/bookings/date', authenticateUser, authenticateAdmin, viewBookingsByDate);

module.exports = router;