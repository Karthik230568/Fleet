const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateOTP, sendOTP } = require('../utils/OTP');

// Signup function

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP in DB
        await OTP.create({ email, otp, createdAt: new Date() });

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({ message: "OTP sent to email. Please verify." });
    } catch (error) {
        next(error);
    }
};



// Login function 
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};
//function to verify otp
const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;

        // Check if OTP exists and is valid
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user after OTP verification
        const user = new User({ email, password: hashedPassword });
        await user.save();

        // Delete OTP after verification
        await OTP.deleteOne({ email });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        next(error);
    }
};



// Export functions
module.exports = { signup, login, verifyOTP };