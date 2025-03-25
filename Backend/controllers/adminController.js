const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');
const User = require('../models/User');
/*controllers:
Add a vehicle
get user profile
update user profile
get past journeys
*/
// Add a new vehicle
const addVehicle = async (req, res, next) => {
    try {
const User = require('../models/User');
const Booking = require('../models/Booking');
const Feedback = require('../models/Feedback');

// Get user profile
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
    try {
        const { fullName, address, phoneNumber, email } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Update profile fields
        user.profile.fullName = fullName || user.profile.fullName;
        user.profile.address = address || user.profile.address;
        user.phone = phoneNumber || user.phone;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// Get past journeys
const getPastJourneys = async (req, res, next) => {
    try {
        const pastJourneys = await Booking.find({
            user: req.user.userId,
            status: 'completed',
        }).populate('vehicle driverDetails');

        res.status(200).json({ pastJourneys });
    } catch (error) {
        next(error);
    }
};

// Submit feedback for a past booking
const submitFeedback = async (req, res, next) => {
    try {
        const { bookingId, comment, rating } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'completed') {
            const error = new Error('Invalid booking');
            error.statusCode = 400;
            throw error;
        }

        const feedback = new Feedback({
            booking: bookingId,
            comment,
            rating,
        });

        await feedback.save();

        // Link feedback to booking
        booking.feedback = feedback._id;
        await booking.save();

        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getPastJourneys,
    submitFeedback,
};
        const vehicle = new Vehicle({
            name,
            image,
            pricePerDay,
            rentalName,
            driverDetails,
        });

        await vehicle.save();

        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Remove a vehicle
const removeVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Vehicle removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Update a vehicle
const updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, image, pricePerDay, rentalName, driverDetails } = req.body;

        const vehicle = await Vehicle.findByIdAndUpdate(
            id,
            { name, image, pricePerDay, rentalName, driverDetails },
            { new: true }
        );

        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Add a new driver
const addDriver = async (req, res, next) => {
    try {
        const { name, licenseNumber, contact } = req.body;

        const driver = new Driver({
            name,
            licenseNumber,
            contact,
        });

        await driver.save();

        res.status(201).json({ message: 'Driver added successfully', driver });
    } catch (error) {
        next(error);
    }
};

// Remove a driver
const removeDriver = async (req, res, next) => {
    try {
        const { id } = req.params;

        const driver = await Driver.findByIdAndDelete(id);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Driver removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

// Update a user
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, phone, isActive } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { username, email, phone, isActive },
            { new: true }
        ).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Get all bookings
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('vehicle')
            .populate('user')
            .populate('driverDetails');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

// View bookings by date
const viewBookingsByDate = async (req, res, next) => {
    try {
        const { date } = req.query;

        const bookings = await Booking.find({
            pickupDate: { $lte: new Date(date) },
            returnDate: { $gte: new Date(date) },
        }).populate('vehicle user');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addVehicle,
    removeVehicle,
    updateVehicle,
    addDriver,
    removeDriver,
    getUsers,
    updateUser,
    deleteUser,
    getAllBookings,
    viewBookingsByDate,
};