const express = require('express');
const { updateProfile, getPastJourneys } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);
router.get('/past-journeys', authMiddleware, getPastJourneys);

module.exports = router;