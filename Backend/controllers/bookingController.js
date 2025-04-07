const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const { calculateTotalPayment } = require('../utils/calculatePayment');
const { markVehicleUnavailable } = require('./vehicleController');
const schedule = require('node-schedule');

const initializeBooking = async (req, res, next) => {
    try {
        const { pickupDate, returnDate, bookingType, city } = req.body;

        // Validate dates
        const pickup = new Date(pickupDate);
        const return_ = new Date(returnDate);
        const now = new Date();

        if (pickup <= now) {
            return res.status(400).json({
                success: false,
                error: "Pickup date must be in the future",
            });
        }

        if (return_ <= pickup) {
            return res.status(400).json({
                success: false,
                error: "Return date must be after pickup date",
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking initialized successfully",
        });
    } catch (error) {
        next(error);
    }
};

const confirmBookingWithDriver = async (req, res, next) => {
    try {
        const { vehicleId, pickupDate, returnDate, address, isDelivery } = req.body;
        
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }

        const userId = req.user._id;

        // Validate dates
        // const pickup = new Date(pickupDate);
        // const return_ = new Date(returnDate);
        // const now = new Date();

        // if (pickup <= now) {
        //     return res.status(400).json({
        //         success: false,
        //         error: "Pickup date must be in the future"
        //     });
        // }

        // if (return_ <= pickup) {
        //     return res.status(400).json({
        //         success: false,
        //         error: "Return date must be after pickup date"
        //     });
        // }

        // const vehicle = await Vehicle.findById(vehicleId);
        // if (!vehicle) {
        //     return res.status(404).json({
        //         success: false,
        //         error: "Vehicle not found"
        //     });
        // }

        const totalPrice = calculateTotalPayment(vehicle.price, pickupDate, returnDate);

        const newBooking = new Booking({
            user: userId,
            vehicle: vehicleId,
            pickupDate: pickup,
            returnDate: return_,
            address,
            totalAmount: totalPrice,
            withDriver: true,
            isDelivery: isDelivery || false,
            status: 'pending',
            bookingDate: new Date()
        });

        await newBooking.save();
        
        const statusUpdated = await markVehicleUnavailable(vehicleId, returnDate, newBooking._id);
        
        if (!statusUpdated) {
            await Booking.findByIdAndDelete(newBooking._id);
            return res.status(500).json({
                success: false,
                error: "Failed to update vehicle status"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking confirmed successfully",
            booking: newBooking
        });

    } catch (error) {
        next(error);
    }
};

const confirmSelfDriveStorePickup = async (req, res, next) => {
    try {
        const { vehicleId, pickupDate, returnDate, userId, termsAccepted } = req.body;

        if (!termsAccepted) {
            return res.status(400).json({
                success: false,
                error: "Terms and conditions must be accepted"
            });
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                error: "Vehicle not found"
            });
        }

        const totalPrice = calculateTotalPayment(vehicle.price, pickupDate, returnDate);

        const newBooking = new Booking({
            user: userId,
            vehicle: vehicleId,
            pickupDate,
            returnDate,
            totalAmount: totalPrice,
            withDriver: false,
            isDelivery: false,
            status: 'pending',
            termsAccepted,
            bookingDate: new Date()
        });

        await newBooking.save();
        
        const statusUpdated = await markVehicleUnavailable(vehicleId, returnDate, newBooking._id);
        
        if (!statusUpdated) {
            await Booking.findByIdAndDelete(newBooking._id);
            return res.status(500).json({
                success: false,
                error: "Failed to update vehicle status"
            });
        }
        

        res.status(200).json({
            success: true,
            message: "Self-drive booking confirmed with store pickup",
            booking: newBooking
        });

    } catch (error) {
        next(error);
    }
};

const confirmSelfDriveHomeDelivery = async (req, res, next) => {
    try {
        const { vehicleId, pickupDate, returnDate, deliveryAddress, userId, termsAccepted } = req.body;

        if (!termsAccepted) {
            return res.status(400).json({
                success: false,
                error: "Terms and conditions must be accepted"
            });
        }

        if (!deliveryAddress) {
            return res.status(400).json({
                success: false,
                error: "Delivery address is required"
            });
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                error: "Vehicle not found"
            });
        }

        const totalPrice = calculateTotalPayment(vehicle.price, pickupDate, returnDate);

        const newBooking = new Booking({
            user: userId,
            vehicle: vehicleId,
            pickupDate,
            returnDate,
            deliveryAddress,
            totalAmount: totalPrice,
            withDriver: false,
            isDelivery: true,
            status: 'pending',
            termsAccepted,
            bookingDate: new Date()
        });

        await newBooking.save();
        
        const statusUpdated = await markVehicleUnavailable(vehicleId, returnDate, newBooking._id);
        
        if (!statusUpdated) {
            await Booking.findByIdAndDelete(newBooking._id);
            return res.status(500).json({
                success: false,
                error: "Failed to update vehicle status"
            });
        }

        res.status(200).json({
            success: true,
            message: "Self-drive booking confirmed with home delivery",
            booking: newBooking
        });

    } catch (error) {
        next(error);
    }
};

// const confirmBooking = async (req, res, next) => {
//     try {
//         const { vehicleId, pickupDate, returnDate, bookingType } = req.body;

//         // Check if user is authenticated
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({
//                 success: false,
//                 error: "User not authenticated",
//             });
//         }

//         const userId = req.user._id;

//         // Validate dates
//         const pickup = new Date(pickupDate);
//         const return_ = new Date(returnDate);

//         if (pickup >= return_) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Return date must be after pickup date",
//             });
//         }

//         const vehicle = await Vehicle.findById(vehicleId);
//         if (!vehicle) {
//             return res.status(404).json({
//                 success: false,
//                 error: "Vehicle not found",
//             });
//         }

//         const totalPrice = calculateTotalPayment(vehicle.price, pickupDate, returnDate);

//         const newBooking = new Booking({
//             user: userId,
//             vehicle: vehicleId,
//             pickupDate: pickup,
//             returnDate: return_,
//             totalAmount: totalPrice,
//             bookingType,
//             status: "pending",
//             bookingDate: new Date(),
//         });

//         await newBooking.save();

//         res.status(200).json({
//             success: true,
//             message: "Booking confirmed successfully",
//             booking: newBooking,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const getActiveBookings = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const currentDate = new Date();

        const activeBookings = await Booking.find({
            user: userId,
            status: { $in: ['pending', 'active'] },  // Include both pending and active bookings
            returnDate: { $gte: currentDate }   // Only check if return date hasn't passed
        }).populate('vehicle', 'name image vehicleId driverName');

        const formattedBookings = activeBookings.map(booking => {
            const startDate = new Date(booking.pickupDate);
            const endDate = new Date(booking.returnDate);
            const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            return {
                vehicleName: booking.vehicle.name,
                startDate: startDate.toLocaleString(),
                endDate: endDate.toLocaleString(),
                duration,
                driverName: booking.vehicle.driverName,
                vehicleId: booking.vehicle.vehicleId,
                price: booking.totalAmount,
                image: booking.vehicle.image,
                bookingId: booking._id,
                status: booking.status,
                withDriver: booking.withDriver,
                isDelivery: booking.isDelivery,
                address: booking.address
            };
        });

        res.status(200).json({
            success: true,
            bookings: formattedBookings
        });

    } catch (error) {
        next(error);
    }
};

const getPastBookings = async (req, res, next) => {
    try {
        const { userId } = req.params;
        
        const pastBookings = await Booking.find({
            user: userId,
            status: 'completed'
        }).populate('vehicle');

        const formattedPastBookings = pastBookings.map(booking => ({
            vehicleName: booking.vehicle.name,
            startDate: new Date(booking.pickupDate).toLocaleString(),
            endDate: new Date(booking.returnDate).toLocaleString(),
            duration: Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24)),
            image: booking.vehicle.image,
            bookingId: booking._id,
            price: booking.totalAmount
        }));

        res.status(200).json({
            success: true,
            bookings: formattedPastBookings
        });

    } catch (error) {
        next(error);
    }
};

const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: "Booking not found"
            });
        }

        // Log the current status for debugging
        console.log('Current booking status:', booking.status);

        // Allow cancellation of both pending and active bookings
        if (!['pending', 'active'].includes(booking.status)) {
            return res.status(400).json({
                success: false,
                error: "Only pending or active bookings can be cancelled"
            });
        }

        // Update vehicle status to available
        await Vehicle.findByIdAndUpdate(booking.vehicle, {
            availability: 'Available'
        });

        // Update booking status to cancelled
        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        console.error('Error in cancelBooking:', error);
        next(error);
    }
};

module.exports = {
    initializeBooking,
    confirmBookingWithDriver,
    confirmSelfDriveStorePickup,
    confirmSelfDriveHomeDelivery,
    getActiveBookings,
    getPastBookings,
    cancelBooking
};