const express = require('express');
const { addVehicle, removeVehicle, addDriver, removeDriver } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/vehicle', authMiddleware, addVehicle);
router.delete('/vehicle/:id', authMiddleware, removeVehicle);
router.post('/driver', authMiddleware, addDriver);
router.delete('/driver/:id', authMiddleware, removeDriver);

module.exports = router;