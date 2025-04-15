const express = require('express');
const router = express.Router();
// import { confirmBooking } from "../controllers/bookingController.js";

const { 
    confirmBooking,
    // initializeBooking,
    // confirmBookingWithDriver,
    // confirmSelfDriveStorePickup,
    // confirmSelfDriveHomeDelivery,
    getActiveBookings,
    getPastBookings,
    cancelBooking
} = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Initialize booking and get price details
// router.post('/initialize', initializeBooking);

// Confirm bookings
// router.post('/confirm-booking', (req, res, next) => {
//     console.log("Hit /confirm-booking route");
//     confirmBooking(req, res, next);
//   });
router.post('/confirm-booking', confirmBooking);
// router.post('/confirm-booking', confirmBooking);
// router.post('/confirm-driver', confirmBookingWithDriver);
// router.post('/confirm-self-drive-store', confirmSelfDriveStorePickup);
// router.post('/confirm-self-drive-home', confirmSelfDriveHomeDelivery);

// Get bookings
router.get('/active/:userId', getActiveBookings);
router.get('/past/:userId', getPastBookings);

// Cancel booking
router.put('/cancel/:bookingId', cancelBooking);

module.exports = router;

// should add authenticateUser middleware