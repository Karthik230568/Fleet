const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};

const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Admin authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }
        
        // For hardcoded admin, we don't have a userId from database
        // Instead we use the admin email from the token
        req.user = { 
            email: decoded.email,
            isAdmin: true 
        };
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};

module.exports = {
    authenticateUser,
    authenticateAdmin
};
