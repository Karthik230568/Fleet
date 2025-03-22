const Booking = require('../models/Booking');
const Feedback = require('../models/Feedback');

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

module.exports = { submitFeedback };