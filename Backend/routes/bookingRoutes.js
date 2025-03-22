const express = require('express');
const { createBooking, confirmPayment } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createBooking);
router.post('/confirm-payment', authMiddleware, confirmPayment);

module.exports = router;