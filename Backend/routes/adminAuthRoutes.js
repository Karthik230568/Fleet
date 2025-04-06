const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminauth');


router.post('/login', login);

module.exports = router;
