const express = require('express');
const router = express.Router();
const { 
    searchVehicles,
    updateVehicleStatus,
    markVehicleUnavailable
} = require('../controllers/vehicleController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// Search vehicles with filters
router.get('/search', authenticateUser, searchVehicles);

// Test endpoint for markVehicleUnavailable
router.post('/:id/mark-unavailable', authenticateUser, authenticateAdmin, async (req, res, next) => {
    try {
        const { returnDate } = req.body;
        const success = await markVehicleUnavailable(req.params.id, returnDate);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Vehicle marked as unavailable'
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Failed to mark vehicle as unavailable'
            });
        }
    } catch (error) {
        next(error);
    }
});

// Vehicle status management routes
router.put('/:id/status', authenticateUser, async (req, res, next) => {
    try {
        const { status, bookingId } = req.body;
        const success = await updateVehicleStatus(req.params.id, status, bookingId);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: `Vehicle status updated to ${status}`
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Failed to update vehicle status'
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router; 
