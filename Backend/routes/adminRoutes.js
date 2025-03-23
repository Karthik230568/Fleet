const express = require('express');
const {
    addVehicle,
    removeVehicle,
    updateVehicle,
    addDriver,
    removeDriver,
    getUsers,
    updateUser,
    deleteUser,
    getAllBookings,
    viewBookingsByDate,
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Vehicle routes
router.post('/vehicle', authMiddleware, addVehicle);
router.delete('/vehicle/:id', authMiddleware, removeVehicle);
router.put('/vehicle/:id', authMiddleware, updateVehicle);

// Driver routes
router.post('/driver', authMiddleware, addDriver);
router.delete('/driver/:id', authMiddleware, removeDriver);

// User routes
router.get('/users', authMiddleware, getUsers);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

// Booking routes
router.get('/bookings', authMiddleware, getAllBookings);
router.get('/bookings-by-date', authMiddleware, viewBookingsByDate);

module.exports = router;