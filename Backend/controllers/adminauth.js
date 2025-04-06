const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@fleetapp@gmail.com';
const ADMIN_PASSWORD = 'admin123456';


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check against hardcoded credentials
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { 
                isAdmin: true,
                email: ADMIN_EMAIL
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            message: "Admin login successful"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};
