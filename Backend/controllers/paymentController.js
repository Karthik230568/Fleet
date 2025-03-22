const Booking = require('../models/Booking');
const { createPaymentIntent } = require('../utils/paymentGateway');

// Process payment
const processPayment = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        // Fetch booking details
        const booking = await Booking.findById(bookingId).populate('vehicle');
        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        // Create payment intent
        const paymentIntent = await createPaymentIntent(booking.totalPayment);

        // Update booking with payment details
        booking.paymentIntentId = paymentIntent.id;
        await booking.save();

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            totalAmount: booking.totalPayment,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { processPayment };