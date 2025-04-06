
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateOTP, sendOTP } = require('../utils/OTP');
 
const signup = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validate inputs
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        // Delete any existing OTP for this email
        await OTP.deleteOne({ email });

        // Generate and save new OTP
        const otp = generateOTP();
        await OTP.create({ 
            email, 
            otp,
            password, // Store password temporarily
            createdAt: new Date() 
        });

        // Send OTP
        try {
            await sendOTP(email, otp);
            console.log(`OTP sent to ${email}`);

            res.status(200).json({ 
                success: true,
                message: "OTP sent successfully. Please check your email." 
            });
        } catch (emailError) {
            // If email sending fails, clean up the OTP record
            await OTP.deleteOne({ email });
            console.error('Email sending error:', emailError);
            throw new Error('Failed to send verification code: ' + emailError.message);
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || "Failed to send OTP. Please try again." 
        });
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
            return res.status(401).json({ error: 'Incorrect Password' });
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
            return res.status(400).json({success: false, message: "Invalid or expired OTP" });
        }

        const otpAge = (new Date() - otpRecord.createdAt) / 1000 / 60;
        if (otpAge > 10) {
            await OTP.deleteOne({ email });
            return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
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
            success: true,
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