const Admin = require('../models/Administrator')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const register=async (req, res,next) => {
    try {
      const { name, email,city, password, contactInfo } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ name, email,city, password: hashedPassword, contactInfo });
      await admin.save();
      res.status(201).json({ message: 'Organization registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering organization', error: error.message });
      next(error);
    }
  };
const login= async (req, res,next) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
      next(error);
    }
};