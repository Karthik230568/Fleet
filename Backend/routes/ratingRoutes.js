const express = require('express');
const router = express.Router();
const { 
    submitFeedback,
    getFeedbackStatus 
} = require('../controllers/ratingController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/submit', authenticateUser, submitFeedback);
router.get('/status/:bookingId', authenticateUser, getFeedbackStatus);

module.exports = router;