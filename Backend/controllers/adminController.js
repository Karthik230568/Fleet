const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

// Vehicle Management
const getAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find()
        
        res.status(200).json({
            success: true,
            vehicles
        });
    } catch (error) {
        next(error);
    }
};


const addVehicle = async (req, res, next) => {
    try {
        const { 
            name, 
            type,
            price,
            city,
            driverName,
            driverId,
            fuelType,
            availability,
            seatingCapacity,
            registrationPlate,
            vehicleId,
            image
        } = req.body;

        // Create vehicle object with required fields
        const vehicleData = {
            name,
            type,
            driverName,
            driverId,
            price,
            city,
            availability,
            rating: 0.0,
            fuelType,
            seatingCapacity,
            registrationPlate,
            vehicleId,
            image
        };

        // Only add driver-related fields if withDriver is true
        // if (withDriver === true) {
        //     if (!driverName || !driverId) {
        //         return res.status(400).json({
        //             success: false,
        //             error: 'Driver name and ID are required when adding a vehicle with driver'
        //         });
        //     }
        //     vehicleData.driverName = driverName;
        //     vehicleData.driverId = driverId;
        // }

        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();

        res.status(201).json({
            success: true,
            message: 'Vehicle added successfully',
            vehicle
        });
    } catch (error) {
        next(error);
    }
};

const updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const vehicle = await Vehicle.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                error: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            vehicle
        });
    } catch (error) {
        next(error);
    }
};

const removeVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                error: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vehicle removed successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Booking Management
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'email')
            .populate('vehicle', 'name type');

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        next(error);
    }
};

// code to get all the active bookings on the selected calendar date

// const Booking = require('../models/Booking'); // adjust path as needed

const viewBookingsByDate = async (req, res, next) => {
    try {
        const { selectedDate } = req.query;

        if (!selectedDate) {
            return res.status(400).json({
                success: false,
                message: "Query parameter 'selectedDate' is required in YYYY-MM-DD format."
            });
        }

        // Convert selectedDate string (YYYY-MM-DD) to a Date object (in UTC)
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

        // Convert formattedDate to a timestamp (milliseconds)
        const selectedDateTimestamp = formattedDate.getTime();

        // Check if the date is valid
        if (isNaN(selectedDateTimestamp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please use a valid date string like '2025-04-07'."
            });
        }

        // Find bookings that are active on the selected date
        const bookings = await Booking.find({
            pickupDate: { $lte: selectedDateTimestamp }, // pickupDate <= selectedDate
            returnDate: { $gte: selectedDateTimestamp } // returnDate >= selectedDate
        })
        .populate('user', 'username fullName email')
        .populate('vehicle', 'name vehicleId type')
        .populate('driver', 'name license contact'); // Populate driver details if needed

        const formattedBookings = bookings.map(booking => ({
            bookingId: booking._id,
            userName: booking.user?.username || 'No username',
            fullname: booking.user?.fullName || 'Unkown User',
            userEmail: booking.user.email,
            vehicleName: booking.vehicle.name,
            pickupDate: booking.pickupDate, // Format as string
            returnDate: booking.returnDate, // Format as string
            // pickupDate: new Date(booking.pickupDate).toLocaleString(), // Format as string
            // returnDate: new Date(booking.returnDate).toLocaleString(), // Format as string
            totalAmount: booking.totalAmount,
            withDriver: booking.withDriver,
            isDelivery: booking.isDelivery,
            address: booking.address,
            // driverName: booking.withDriver?.driver.name || 'No driver', // Driver name if available
            driverName: booking.withDriver && booking.driver?.name ? booking.driver.name : 'No driver',
            // driverName: booking.withDriver && booking.driver?.name ? booking.driver.name : 'No driver',

            status: booking.status,
            vehicleId: booking.vehicle.vehicleId,
            bookingDate: new Date(booking.bookingDate).toLocaleString(), // Format as string
            rating: booking.rating
        }));

        res.status(200).json({
            success: true,
            activeOn: selectedDate,
            total: formattedBookings.length,
            bookings: formattedBookings
        });

    } catch (error) {
        next(error);
    }
};


// code to get all the active bookings on the selected calendar date            here the dates had no timestamps in them, hence it was not working
// const Booking = require('../models/Booking'); // adjust path as needed

// const viewBookingsByDate = async (req, res, next) => {
//     try {
//         const { selectedDate } = req.query;

//         if (!selectedDate) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Query parameter 'selectedDate' is required in YYYY-MM-DD format."
//             });
//         }

//         const date = new Date(selectedDate);
//         if (isNaN(date.getTime())) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid date format. Please use a valid date string like '2025-04-07'."
//             });
//         }

//         const bookings = await Booking.find({
//             pickupDate: { $lte: date },
//             returnDate: { $gte: date }
//         })
//         .populate('user', 'name email')
//         .populate('vehicle', 'name type');

//         const formattedBookings = bookings.map(booking => ({
//             bookingId: booking._id,
//             userName: booking.user.name,
//             userEmail: booking.user.email,
//             vehicleName: booking.vehicle.name,
//             pickupDate: booking.pickupDate.toLocaleString(),
//             returnDate: booking.returnDate.toLocaleString(),
//             totalAmount: booking.totalAmount,
//             withDriver: booking.withDriver,
//             isDelivery: booking.isDelivery,
//             address: booking.address,
//             status: booking.status,
//             bookingDate: booking.bookingDate.toLocaleString(),
//             rating: booking.rating
//         }));

//         res.status(200).json({
//             success: true,
//             activeOn: selectedDate,
//             total: formattedBookings.length,
//             bookings: formattedBookings
//         });

//     } catch (error) {
//         next(error);
//     }
// };


// code to get all the active bookings on the selected calendar date   {here the formatting was wrong ddmmyyyy}
// const viewBookingsByDate = async (req, res, next) => {
//     try {
//         const { selectedDate } = req.query;

//         if (!selectedDate) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Query parameter 'selectedDate' is required."
//             });
//         }

//         // Parse DD-MM-YYYY to Date object
//         const [day, month, year] = selectedDate.split('-');
//         const parsedDate = new Date(`${year}-${month}-${day}T00:00:00`);

//         if (isNaN(parsedDate.getTime())) {
//             return res.status(400).json({ success: false, message: 'Invalid date format' });
//         }

//         // Query bookings active on that date
//         const bookings = await Booking.find({
//             pickupDate: { $lte: parsedDate },
//             returnDate: { $gte: parsedDate }
//         })
//         .populate('user', 'name email')
//         .populate('vehicle', 'name type');

//         const formattedBookings = bookings.map(booking => ({
//             bookingId: booking._id,
//             userName: booking.user.name,
//             userEmail: booking.user.email,
//             vehicleName: booking.vehicle.name,
//             pickupDate: booking.pickupDate.toLocaleString(),
//             returnDate: booking.returnDate.toLocaleString(),
//             totalAmount: booking.totalAmount,
//             withDriver: booking.withDriver,
//             isDelivery: booking.isDelivery,
//             address: booking.address,
//             status: booking.status,
//             bookingDate: booking.bookingDate.toLocaleString(),
//             rating: booking.rating
//         }));

//         res.status(200).json({
//             success: true,
//             activeOn: selectedDate,
//             total: formattedBookings.length,
//             bookings: formattedBookings
//         });

//     } catch (error) {
//         next(error);
//     }
// };


//code to get all the bookings from start date to the latest booking in the database. this is not implemented
// const viewBookingsByDate = async (req, res, next) => {
//     try {
//         const { startDate } = req.query;

//         if (!startDate) {
//             return res.status(400).json({ success: false, message: "startDate is required" });
//         }

//         // Step 1: Find the latest returnDate in the Booking collection
//         const latestBooking = await Booking.findOne().sort({ returnDate: -1 }).limit(1);
//         if (!latestBooking) {
//             return res.status(200).json({ success: true, bookings: [], message: "No bookings found" });
//         }

//         const endDate = latestBooking.returnDate;

//         // Step 2: Query bookings between startDate and endDate
//         const bookings = await Booking.find({
//             $or: [
//                 {
//                     pickupDate: {
//                         $gte: new Date(startDate),
//                         $lte: endDate
//                     }
//                 },
//                 {
//                     returnDate: {
//                         $gte: new Date(startDate),
//                         $lte: endDate
//                     }
//                 },
//                 {
//                     $and: [
//                         { pickupDate: { $lte: new Date(startDate) } },
//                         { returnDate: { $gte: endDate } }
//                     ]
//                 }
//             ]
//         })
//         .populate('user', 'name email')
//         .populate('vehicle', 'name type');

//         // Step 3: Format results
//         const formattedBookings = bookings.map(booking => ({
//             bookingId: booking._id,
//             userName: booking.user.name,
//             userEmail: booking.user.email,
//             vehicleName: booking.vehicle.name,
//             pickupDate: new Date(booking.pickupDate).toLocaleString(),
//             returnDate: new Date(booking.returnDate).toLocaleString(),
//             totalAmount: booking.totalAmount,
//             status: booking.status,
//             withDriver: booking.withDriver,
//             isDelivery: booking.isDelivery,
//             address: booking.address
//         }));

//         res.status(200).json({
//             success: true,
//             bookings: formattedBookings,
//             dateRange: {
//                 startDate,
//                 endDate: endDate.toISOString()
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };


//code to get bookind from start date to end date, but our frontend only provides start date hence we will not use it
// const viewBookingsByDate = async (req, res, next) => {
//     try {
//         const { startDate, endDate } = req.query;
        
//         const bookings = await Booking.find({
//             $or: [
//                 {
//                     pickupDate: {
//                         $gte: new Date(startDate),
//                         $lte: new Date(endDate)
//                     }
//                 },
//                 {
//                     returnDate: {
//                         $gte: new Date(startDate),
//                         $lte: new Date(endDate)
//                     }
//                 },
//                 {
//                     $and: [
//                         { pickupDate: { $lte: new Date(startDate) } },
//                         { returnDate: { $gte: new Date(endDate) } }
//                     ]
//                 }
//             ]
//         })
//         .populate('user', 'name email')
//         .populate('vehicle', 'name type');

//         const formattedBookings = bookings.map(booking => ({
//             bookingId: booking._id,
//             userName: booking.user.name,
//             userEmail: booking.user.email,
//             vehicleName: booking.vehicle.name,
//             pickupDate: new Date(booking.pickupDate).toLocaleString(),
//             returnDate: new Date(booking.returnDate).toLocaleString(),
//             totalAmount: booking.totalAmount,
//             status: booking.status,
//             withDriver: booking.withDriver,
//             isDelivery: booking.isDelivery,
//             address: booking.address
//         }));

//         res.status(200).json({
//             success: true,
//             bookings: formattedBookings,
//             dateRange: {
//                 startDate,
//                 endDate
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// Driver Management
const addDriver = async (req, res, next) => {
    try {
        const { name, age, phone, license, vehicleId, driverId, image, address } = req.body;

        // Create driver object with required fields
        const driverData = {
            name,
            age,
            phone,
            license,
            driverId,
            address,
            image: image || 'default-driver.jpg'
        };

        // Only add vehicleId if it's provided
        if (vehicleId) {
            driverData.vehicleId = vehicleId;
        }

        const driver = new Driver(driverData);
        await driver.save();

        res.status(201).json({
            success: true,
            message: 'Driver added successfully',
            driver
        });
    } catch (error) {
        next(error);
    }
};

const removeDriver = async (req, res, next) => {
    try {
        const { id } = req.params;

        const driver = await Driver.findByIdAndDelete(id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'Driver not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Driver removed successfully'
        });
    } catch (error) {
        next(error);
    }
};

const getDrivers = async (req, res, next) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({
            success: true,
            drivers
        });
    } catch (error) {
        next(error);
    }
};

const getDriverProfile = async (req, res, next) => {
    try {
        const driver = await Driver.findById(req.user.userId)
            .select('name license contact');

        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'Driver not found'
            });
        }

        res.status(200).json({
            success: true,
            driver
        });
    } catch (error) {
        next(error);
    }
};

const updateDriverProfile = async (req, res, next) => {
    try {
        const { name, contact } = req.body;
        
        const driver = await Driver.findByIdAndUpdate(
            req.user.userId,
            { name, contact },
            { new: true }
        );

        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'Driver not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            driver
        });
    } catch (error) {
        next(error);
    }
};

// Update a driver by ID
const updateDriver = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, age, phone, license, vehicleId, driverId, image, address } = req.body;

        // Create update object with provided fields
        const updateData = {};
        
        if (name) updateData.name = name;
        if (age) updateData.age = age;
        if (phone) updateData.phone = phone;
        if (license) updateData.license = license;
        if (driverId) updateData.driverId = driverId;
        if (address) updateData.address = address;
        if (image) updateData.image = image;
        
        // Handle vehicleId separately as it can be null
        if (vehicleId !== undefined) {
            updateData.vehicleId = vehicleId || "";
        }

        const driver = await Driver.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'Driver not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Driver updated successfully',
            driver
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle,
    getAllBookings,
    viewBookingsByDate,
    addDriver,
    removeDriver,
    getDrivers,
    getDriverProfile,
    updateDriverProfile,
    updateDriver
};


// const getVehicleById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const vehicle = await Vehicle.findById(id)
//             .select('name type price availability rating driver fuelType seatingCapacity registrationPlate vehicleId image city');
        
//         if (!vehicle) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Vehicle not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             vehicle
//         });
//     } catch (error) {
//         next(error);
//     }
// };
