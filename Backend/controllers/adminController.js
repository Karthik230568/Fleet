const Admin = require('../models/Administrator') 
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');

/*controllers:
Add a vehicle
get user profile
update user profile
get bookings by date
*/
// Add a new vehicle



const addVehicle = async (req, res, next) => {
    try{
        const { name, image, pricePerDay, rentalName, driverDetails } = req.body
        const vehicle = new Vehicle({
            name,
            image,
            pricePerDay,
            rentalName,
            driverDetails,
        });

        await vehicle.save();

        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Remove a vehicle
const removeVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Vehicle removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Update a vehicle
const updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, image, pricePerDay, rentalName, driverDetails } = req.body;

        const vehicle = await Vehicle.findByIdAndUpdate(
            id,
            { name, image, pricePerDay, rentalName, driverDetails },
            { new: true }
        );

        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// Add a new driver
const addDriver = async (req, res, next) => {
    try {
        const { name, licenseNumber, contact } = req.body;

        const driver = new Driver({
            name,
            licenseNumber,
            contact,
        });

        await driver.save();

        res.status(201).json({ message: 'Driver added successfully', driver });
    } catch (error) {
        next(error);
    }
};

// Remove a driver
const removeDriver = async (req, res, next) => {
    try {
        const { id } = req.params;

        const driver = await Driver.findByIdAndDelete(id);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'Driver removed successfully' });
    } catch (error) {
        next(error);
    }
};



// Get all bookings
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('vehicle')
            .populate('user')
            .populate('driverDetails');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

// View bookings by date
const viewBookingsByDate = async (req, res, next) => {
    try {
        const { date } = req.query;

        const bookings = await Booking.find({
            pickupDate: { $lte: new Date(date) },
            returnDate: { $gte: new Date(date) },
        }).populate('vehicle user');

        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addVehicle,
    removeVehicle,
    updateVehicle,
    addDriver,
    removeDriver,
    getAllBookings,
    viewBookingsByDate,
};


// const register=async (req, res,next) => {
//     try {
//       const { name, email,city, password, contactInfo } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const admin = new Admin({ name, email,city, password: hashedPassword, contactInfo });
//       await admin.save();
//       res.status(201).json({ message: 'Organization registered successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error registering organization', error: error.message });
//       next(error);
//     }
// };

// const login= async (req, res,next) => {
//     try {
//       const { email, password } = req.body;
//       const admin = await Admin.findOne({ email });
//       if (!admin || !(await bcrypt.compare(password, admin.password))) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
//       const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       res.json({ token });
//     } catch (error) {
//       res.status(500).json({ message: 'Error logging in', error: error.message });
//       next(error);
//     }
// };