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
router.post('/initialize',  initializeBooking);

// Confirm bookings
router.post('/confirm-driver',  confirmBookingWithDriver);
router.post('/confirm-self-drive-store',  confirmSelfDriveStorePickup);
router.post('/confirm-self-drive-home',  confirmSelfDriveHomeDelivery);

// Get bookings
router.get('/active/:userId',  getActiveBookings);
router.get('/past/:userId',  getPastBookings);

// Cancel booking
router.put('/cancel/:bookingId',  cancelBooking);

module.exports = router;