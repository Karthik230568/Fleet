const express = require('express');
const router = express.Router();
const { 
    signup, 
    login, 
    verifyOTP 
} = require('../controllers/authController');
const { 
    validateSignup, 
    validateLogin, 
    handleValidationErrors 
} = require('../middleware/validationMiddleware');

// Auth routes
router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);
router.post('/verify-otp', verifyOTP);

module.exports = router;