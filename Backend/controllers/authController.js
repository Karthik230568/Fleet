const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateOTP, sendOTP } = require('../utils/OTP');

const signup = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const otp = generateOTP();
        await OTP.create({ 
            email, 
            otp,
            createdAt: new Date() 
        });

        await sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent to email. Please verify." });
    } catch (error) {
        console.error('Signup error:', error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ error: 'Please verify your email first' });
        }

        const token = jwt.sign(
            { 
                userId: user._id,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;

        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const otpAge = (new Date() - otpRecord.createdAt) / 1000 / 60;
        if (otpAge > 10) {
            await OTP.deleteOne({ email });
            return res.status(400).json({ error: "OTP has expired. Please request a new one." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            email, 
            password: hashedPassword,
            role: 'customer',
            isVerified: true
        });
        await user.save();

        await OTP.deleteOne({ email });

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully!",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Verify OTP error:', error);
        next(error);
    }
};

const resendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        
        await OTP.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date() },
            { upsert: true }
        );

        await sendOTP(email, otp);
        res.status(200).json({ message: "New OTP sent successfully" });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const otp = generateOTP();
        await OTP.create({ email, otp, createdAt: new Date() });
        await sendOTP(email, otp);

        res.status(200).json({ message: "Password reset OTP sent to email" });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;
        
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        await OTP.deleteOne({ email });

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    signup, 
    login, 
    verifyOTP, 
    resendOTP, 
    forgotPassword, 
    resetPassword 
};