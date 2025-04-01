const express = require('express');
const router = express.Router();
const { 
    initializeBooking,
    confirmBookingWithDriver,
    confirmSelfDriveStorePickup,
    confirmSelfDriveHomeDelivery,
    getActiveBookings,
    getPastBookings,
    cancelBooking
} = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Initialize booking and get price details
router.post('/initialize', authenticateUser, initializeBooking);

// Confirm bookings
router.post('/confirm-driver', authenticateUser, confirmBookingWithDriver);
router.post('/confirm-self-drive-store', authenticateUser, confirmSelfDriveStorePickup);
router.post('/confirm-self-drive-home', authenticateUser, confirmSelfDriveHomeDelivery);

// Get bookings
router.get('/active/:userId', authenticateUser, getActiveBookings);
router.get('/past/:userId', authenticateUser, getPastBookings);

// Cancel booking
router.put('/cancel/:bookingId', authenticateUser, cancelBooking);

module.exports = router;