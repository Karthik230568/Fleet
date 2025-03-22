const express = require('express');
const { processPayment, confirmPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/process-payment', authMiddleware, processPayment);
router.post('/confirm-payment', authMiddleware, confirmPayment);

module.exports = router;