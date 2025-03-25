const express = require('express');
const { signup, login, verifyOTP } = require('../controllers/authController');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middleware/validationMiddleware');
// const { generateOTP, sendOTP } = require('../utils/OTP'); // Import OTP functions
const router = express.Router();

router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);
router.post('/verify-otp', verifyOTP);

// // New route for sending OTP
// router.post('/send-otp', async (req, res) => {
//     const { email } = req.body;
//     const otp = generateOTP(); // Generate a 6-digit OTP

//     try {
//         await sendOTP(email, otp);
//         res.status(200).json({ message: 'OTP sent to email' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error sending OTP' });
//     }
// });

module.exports = router;