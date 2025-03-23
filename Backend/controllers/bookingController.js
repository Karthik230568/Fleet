const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const { calculateTotalPayment } = require('../utils/calculatePayment');

// Get all bookings for a user
const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.userId })
            .populate('vehicle')
            .populate('driverDetails');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

// Create a new booking
const createBooking = async (req, res, next) => {
    try {
        const { vehicle, pickupDate, returnDate, pickupLocation, city, withDriver, deliveryRequired } = req.body;

        // Fetch vehicle details
        const selectedVehicle = await Vehicle.findById(vehicle);
        if (!selectedVehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        // Calculate total payment
        const totalPayment = calculateTotalPayment(selectedVehicle.pricePerDay, pickupDate, returnDate);

        // Create booking
        const booking = new Booking({
            user: req.user.userId,
            vehicle,
            pickupDate,
            returnDate,
            pickupLocation,
            city,
            withDriver,
            deliveryRequired,
            totalPayment,
        });

        await booking.save();

        // Update vehicle availability
        selectedVehicle.availability = false;
        await selectedVehicle.save();

        // Assign driver for delivery (if self-driving and delivery is required)
        if (!withDriver && deliveryRequired) {
            const availableDriver = await Driver.findOne({ availability: true });
            if (!availableDriver) {
                const error = new Error('No available drivers for delivery');
                error.statusCode = 400;
                throw error;
            }

            // Assign driver to booking
            booking.driverDetails = availableDriver._id;
            await booking.save();

            // Update driver availability
            availableDriver.availability = false;
            await availableDriver.save();
        }

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        next(error);
    }
};

// Update a booking
const updateBooking = async (req, res, next) => {
    try {
        const { bookingId, pickupDate, returnDate, pickupLocation, city, withDriver, deliveryRequired } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        // Update booking fields
        booking.pickupDate = pickupDate || booking.pickupDate;
        booking.returnDate = returnDate || booking.returnDate;
        booking.pickupLocation = pickupLocation || booking.pickupLocation;
        booking.city = city || booking.city;
        booking.withDriver = withDriver || booking.withDriver;
        booking.deliveryRequired = deliveryRequired || booking.deliveryRequired;

        await booking.save();

        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        next(error);
    }
};

// Cancel a booking
const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'active') {
            const error = new Error('Invalid booking');
            error.statusCode = 400;
            throw error;
        }

        // Update booking status
        booking.status = 'cancelled';
        await booking.save();

        // Update vehicle availability
        const vehicle = await Vehicle.findById(booking.vehicle);
        vehicle.availability = true;
        await vehicle.save();

        // Update driver availability (if a driver was assigned for delivery)
        if (booking.driverDetails) {
            const driver = await Driver.findById(booking.driverDetails);
            if (driver) {
                driver.availability = true;
                await driver.save();
            }
        }

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserBookings,
    createBooking,
    updateBooking,
    cancelBooking,
};