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
  updateDriverProfile,
  updateDriver
} = require('../controllers/adminController');

const { login } = require('../controllers/adminauth');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// ✅ This route must come **before** authentication middleware!
router.post('/login', login);

// ✅ Protect all following admin routes
router.use(authenticateUser);
router.use(authenticateAdmin);

// Vehicle routes
router.get('/vehicles', getAllVehicles);
router.post('/vehicles', addVehicle);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', removeVehicle);

// Driver routes
router.post('/drivers', addDriver);
router.delete('/drivers/:id', removeDriver);
router.get('/drivers', getDrivers);
router.put('/drivers/:id', updateDriver);
router.get('/drivers/profile', getDriverProfile);
router.put('/drivers/profile', updateDriverProfile);

// Booking routes
router.get('/bookings', getAllBookings);
router.get('/bookings/date', viewBookingsByDate);

module.exports = router;
