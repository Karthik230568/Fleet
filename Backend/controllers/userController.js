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
        const { fullName, address, phoneNumber, email, dateOfBirth } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Update profile fields
        user.profile.fullName = fullName || user.profile.fullName;
        user.profile.address = address || user.profile.address;
        user.profile.dateOfBirth = dateOfBirth || user.profile.dateOfBirth; // Add dateOfBirth
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

// Get active journeys
const getActiveJourneys = async (req, res, next) => {
    try {
        const activeJourneys = await Booking.find({
            user: req.user.userId,
            status: 'active',
        }).populate('vehicle driverDetails');

        res.status(200).json({ activeJourneys });
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
    getActiveJourneys, // Added active journeys
    submitFeedback,
};