const Admin = require('../models/Administrator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        // Check if admin already exists
        const adminExists = await Admin.countDocuments();
        if (adminExists > 0) {
            return res.status(403).json({ error: "Admin already exists. Only one admin is allowed." });
        }

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({
            email,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: "Admin registered successfully"
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { userId: admin._id, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            message: "Login successful"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};