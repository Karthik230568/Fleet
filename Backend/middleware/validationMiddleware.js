const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateBooking = [
    body('pickupDate').isISO8601().withMessage('Invalid pickup date'),
    body('returnDate').isISO8601().withMessage('Invalid return date'),
    body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    validateBooking,
    handleValidationErrors,
};