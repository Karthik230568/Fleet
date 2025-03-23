const express = require('express');
const {
    getUserBookings,
    createBooking,
    updateBooking,
    cancelBooking,
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all bookings for a user
router.get('/', authMiddleware, getUserBookings);

// Create a new booking
router.post('/create', authMiddleware, createBooking);

// Update a booking
router.put('/:id', authMiddleware, updateBooking);

// Cancel a booking
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;