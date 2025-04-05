const express = require('express');
const router = express.Router();
const {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle,
    getAllBookings,
    viewBookingsByDate,
    addDriver,
    removeDriver,
    getDrivers,
    getDriverProfile,
    updateDriverProfile
} = require('../controllers/adminController');

const { register, login } = require('../controllers/adminauth');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
// Vehicle routes
router.get('/vehicles',  getAllVehicles);
router.post('/vehicles',  addVehicle);
router.put('/vehicles/:id',  updateVehicle);
router.delete('/vehicles/:id',  removeVehicle);

// Driver routes
router.post('/drivers',  addDriver);
router.delete('/drivers/:id',  removeDriver);
router.get('/drivers',  getDrivers);
router.get('/drivers/profile',  getDriverProfile);
router.put('/drivers/profile',  updateDriverProfile);

// Booking routes
router.get('/bookings',  getAllBookings);
router.get('/bookings/date',  viewBookingsByDate);

module.exports = router;