const express = require('express');
const { searchVehicles, getVehicleDetails } = require('../controllers/vehicleController');
const router = express.Router();

router.get('/search', searchVehicles);
router.get('/:id', getVehicleDetails);

module.exports = router;