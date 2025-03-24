require('dotenv').config(); // Load environment variables from .env
console.log('MongoDB URI:', process.env.MONGO_URI); // Debug: Check MongoDB URI
console.log('Stripe API Key:', process.env.STRIPE_SECRET_KEY); // Debug: Check Stripe API Key

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const userRoutes = require('./routes/userRoutes'); // User profile and journeys
const vehicleRoutes = require('./routes/vehicleRoutes'); // Vehicle search and details
const bookingRoutes = require('./routes/bookingRoutes'); // Booking management
const adminRoutes = require('./routes/adminRoutes'); // Admin operations
const paymentRoutes = require('./routes/paymentRoutes'); // Payment processing
const driverRoutes = require('./routes/driverRoutes'); // Driver management
const ratingRoutes = require('./routes/ratingRoutes'); // Rating submission
const errorHandler = require('./middleware/errorHandler'); // Error handling middleware

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Database Connection
connectDB(); // Establish connection to MongoDB

// Simple health check endpoint
app.get('/', (req, res) => {
    res.send('This is the home page');
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login, OTP)
app.use('/api/user', userRoutes); // User profile and past journeys
app.use('/api/vehicle', vehicleRoutes); // Vehicle search and details
app.use('/api/booking', bookingRoutes); // Booking creation, update, and cancellation
app.use('/api/admin', adminRoutes); // Admin operations (add/remove vehicles, drivers, etc.)
app.use('/api/payment', paymentRoutes); // Payment processing and status
app.use('/api/driver', driverRoutes); // Driver management (add/remove drivers)
app.use('/api/rating', ratingRoutes); // Rating submission for vehicles and drivers

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;