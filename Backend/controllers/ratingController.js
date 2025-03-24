// Mock data for testing
const mockVehicles = [
    { id: 'vehicle_id', make: 'Toyota', model: 'Camry', year: 2021, licensePlate: 'ABC123', rating: 4.0 },
];

const mockDrivers = [
    { id: 'driver_id', name: 'John Doe', licenseNumber: 'D1234567', phone: '1234567890', rating: 4.0 },
];

const mockBookings = [
    { id: 'booking_id', vehicle: 'vehicle_id', driverDetails: 'driver_id', status: 'completed' },
];

// Submit rating for a vehicle
const rateVehicle = async (req, res, next) => {
    try {
        const { bookingId, rating } = req.body;

        // Validate rating
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            const error = new Error('Invalid rating');
            error.statusCode = 400;
            throw error;
        }

        // Fetch booking details
        const booking = mockBookings.find(b => b.id === bookingId);
        if (!booking || booking.status !== 'completed') {
            const error = new Error('Invalid booking');
            error.statusCode = 404;
            throw error;
        }

        // Fetch vehicle details
        const vehicle = mockVehicles.find(v => v.id === booking.vehicle);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        // Update vehicle rating
        vehicle.rating = (vehicle.rating + rating) / 2; // Average rating

        res.status(200).json({ message: 'Vehicle rated successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Submit rating for a driver
const rateDriver = async (req, res, next) => {
    try {
        const { bookingId, rating } = req.body;

        // Validate rating
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            const error = new Error('Invalid rating');
            error.statusCode = 400;
            throw error;
        }

        // Fetch booking details
        const booking = mockBookings.find(b => b.id === bookingId);
        if (!booking || booking.status !== 'completed') {
            const error = new Error('Invalid booking');
            error.statusCode = 404;
            throw error;
        }

        // Fetch driver details
        const driver = mockDrivers.find(d => d.id === booking.driverDetails);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        // Update driver rating
        driver.rating = (driver.rating + rating) / 2; // Average rating

        res.status(200).json({ message: 'Driver rated successfully', driver });
    } catch (error) {
        next(error);
    }
};

module.exports = { rateVehicle, rateDriver };