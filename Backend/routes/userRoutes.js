const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    getPastJourneys,
    getActiveJourneys,
    submitFeedback
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User profile routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Journey routes
router.get('/past-journeys', authMiddleware, getPastJourneys);
router.get('/active-journeys', authMiddleware, getActiveJourneys);

// Feedback route
router.post('/feedback', authMiddleware, submitFeedback);

module.exports = router;