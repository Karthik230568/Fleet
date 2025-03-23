const Booking = require('../models/Booking');
const { createPaymentIntent, retrievePaymentIntent, createRefund } = require('../utils/paymentGateway');

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

// Confirm payment
const confirmPayment = async (req, res, next) => {
    try {
        const { bookingId, paymentIntentId } = req.body;

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            const error = new Error('Booking not found');
            error.statusCode = 404;
            throw error;
        }

        // Confirm payment with Stripe
        const paymentIntent = await retrievePaymentIntent(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            const error = new Error('Payment not succeeded');
            error.statusCode = 400;
            throw error;
        }

        // Update booking status
        booking.paymentStatus = 'completed';
        booking.status = 'active'; // Mark booking as active
        await booking.save();

        res.status(200).json({ message: 'Payment confirmed successfully' });
    } catch (error) {
        next(error);
    }
};

// Check payment status
const checkPaymentStatus = async (req, res, next) => {
    try {
        const { paymentIntentId } = req.params;

        // Retrieve payment intent
        const paymentIntent = await retrievePaymentIntent(paymentIntentId);

        res.status(200).json({ status: paymentIntent.status });
    } catch (error) {
        next(error);
    }
};

// Refund payment
const refundPayment = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.paymentStatus !== 'completed') {
            const error = new Error('Invalid booking or payment not completed');
            error.statusCode = 400;
            throw error;
        }

        // Create refund
        const refund = await createRefund(booking.paymentIntentId);

        // Update booking status
        booking.paymentStatus = 'refunded';
        await booking.save();

        res.status(200).json({ message: 'Refund processed successfully', refund });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    processPayment,
    confirmPayment,
    checkPaymentStatus,
    refundPayment,
};