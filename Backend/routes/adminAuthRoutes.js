const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/adminauth');

// Admin auth routes
router.post('/register', register);
router.post('/login', login);

module.exports = router; 