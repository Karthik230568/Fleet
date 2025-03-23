const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
        });
        return paymentIntent;
    } catch (error) {
        throw new Error(`Payment failed: ${error.message}`);
    }
};

module.exports = { createPaymentIntent };