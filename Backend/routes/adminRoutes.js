const express = require('express');
const {
    addVehicle,
    removeVehicle,
    updateVehicle,
    addDriver,
    updateDriver,
    removeDriver,
    getAllBookings,
    viewBookingsByDate,
} = require('../controllers/adminController');

const { validateLogin, handleValidationErrors } = require('../middleware/validationMiddleware');

const { login, register }= require('../controllers/adminauth')

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//login
router.post('/register', register)

router.post('/login', validateLogin, handleValidationErrors, login)

// Vehicle routes
router.post('/vehicle', authMiddleware, addVehicle);
router.delete('/vehicle/:id', authMiddleware, removeVehicle);
router.patch('/vehicle/:id', authMiddleware, updateVehicle);

// Driver routes
router.post('/driver', authMiddleware, addDriver);
router.patch('/driver/:id',authMiddleware, updateDriver);
router.delete('/driver/:id', authMiddleware, removeDriver);


// Booking routes
router.get('/bookings', authMiddleware, getAllBookings);
router.get('/bookings-by-date', authMiddleware, viewBookingsByDate);

module.exports = router;


//register and login
// router.post('/register',register)
// router.post('/login',login)