const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    getPastJourneys,
    submitFeedback,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User profile routes
router.get('/profile', authMiddleware, getUserProfile); // Get user profile
router.put('/profile', authMiddleware, updateUserProfile); // Update user profile

// Past journeys route
router.get('/past-journeys', authMiddleware, getPastJourneys); // Get past journeys

// Feedback route
router.post('/feedback', authMiddleware, submitFeedback); // Submit feedback

module.exports = router;