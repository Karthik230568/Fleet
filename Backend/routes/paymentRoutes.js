const express = require('express');
const {
    processPayment,
    confirmPayment,
    checkPaymentStatus,
    refundPayment,
} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Process payment
router.post('/process-payment', authMiddleware, processPayment);

// Confirm payment
router.post('/confirm-payment', authMiddleware, confirmPayment);

// Check payment status
router.get('/:paymentIntentId', authMiddleware, checkPaymentStatus);

// Refund payment
router.post('/refund', authMiddleware, refundPayment);

module.exports = router;