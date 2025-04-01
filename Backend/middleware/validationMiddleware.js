const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    //body('fullName').notEmpty().withMessage('Full name is required'),
    //body('phoneNumber').notEmpty().withMessage('Phone number is required')
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

// const validateBooking = [
//     body('vehicleId').notEmpty().withMessage('Vehicle ID is required'),
//     body('pickupDate').isISO8601().withMessage('Invalid pickup date')
//         .custom((value, { req }) => {
//             const today = new Date();
//             const pickupDate = new Date(value);
//             if (pickupDate < today) {
//                 throw new Error('Pickup date cannot be in the past');
//             }
//             return true;
//         }),
//     body('returnDate').isISO8601().withMessage('Invalid return date')
//         .custom((value, { req }) => {
//             const pickupDate = new Date(req.body.pickupDate);
//             const returnDate = new Date(value);
//             if (returnDate <= pickupDate) {
//                 throw new Error('Return date must be after pickup date');
//             }
//             return true;
//         }),
//     body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
// ];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    // validateBooking,
    handleValidationErrors,
};
//const { body, validationResult } = require('express-validator');

// // Validation rules for user signup
// const validateSignup = [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//     body('confirmPassword')
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Passwords do not match');
//             }
//             return true;
//         }),
// ];

// // Validation rules for user login
// const validateLogin = [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('password').notEmpty().withMessage('Password is required'),
// ];

// // Validation rules for OTP verification
// const validateOTPVerification = [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('otp').notEmpty().withMessage('OTP is required'),
// ];

// // Validation rules for password reset
// const validateResetPassword = [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('otp').notEmpty().withMessage('OTP is required'),
//     body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
// ];

// // Middleware to handle validation errors
// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             success: false,
//             errors: errors.array(),
//         });
//     }
//     next();
// };

// module.exports = {
//     validateSignup,
//     validateLogin,
//     validateOTPVerification,
//     validateResetPassword,
//     handleValidationErrors,
// };
