const Vehicle = require('../models/Vehicle');
const schedule = require('node-schedule');
const Booking = require('../models/Booking');

const searchVehicles = async (req, res, next) => {
    try {
        const { pickupDate, returnDate, withDriver, city, filter = 'All' } = req.query;

        let query = {
            city: city,
            availability: 'Available'
        };

        // Validate dates if provided
        if (pickupDate && returnDate) {
            query.bookings = {
                $not: {
                    $elemMatch: {
                        pickupDate: { $lte: new Date(returnDate) },
                        returnDate: { $gte: new Date(pickupDate) },
                        status: { $in: ['active', 'pending'] }
                    }
                }
            };
        }

        // Handle withDriver parameter
        if (withDriver === 'true') {
            query.driverName = { $exists: true, $ne: null };
        } else if (withDriver === 'false') {
            query.driverName = { $exists: false };
        }

        let vehicles = await Vehicle.find(query);

        if (filter !== 'All') {
            switch (filter) {
                case 'Cars':
                    vehicles = vehicles.filter(v => v.type.toLowerCase() === 'car');
                    break;
                case 'Bikes':
                    vehicles = vehicles.filter(v => v.type.toLowerCase() === 'bike');
                    break;
                case 'Price':
                    vehicles.sort((a, b) => a.price - b.price);
                    break;
                case 'Rating':
                    vehicles.sort((a, b) => b.rating - a.rating);
                    break;
            }
        }

        const formattedVehicles = vehicles.map(vehicle => ({
            id: vehicle._id,
            name: vehicle.name,
            image: vehicle.image,
            type: vehicle.type,
            price: vehicle.price,
            availability: vehicle.availability,
            rating: vehicle.rating,
            driverName: vehicle.driverName,
            fuelType: vehicle.fuelType,
            seatingCapacity: vehicle.seatingCapacity,
            registrationPlate: vehicle.registrationPlate,
            vehicleId: vehicle.vehicleId,
            city: vehicle.city
        }));

        res.status(200).json({
            success: true,
            count: formattedVehicles.length,
            vehicles: formattedVehicles,
            searchCriteria: {
                pickupDate,
                returnDate,
                withDriver,
                city
            }
        });

    } catch (error) {
        next(error);
    }
};

const updateVehicleStatus = async (vehicleId, status, bookingId) => {
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (vehicle) {
            vehicle.availability = status;
            await vehicle.save();

            if (bookingId) {
                if (status === 'Not available') {
                    await Booking.findByIdAndUpdate(bookingId, { 
                        status: 'active',
                        bookingStartDate: new Date()
                    });
                } else if (status === 'Available') {
                    await Booking.findByIdAndUpdate(bookingId, { 
                        status: 'completed',
                        bookingEndDate: new Date()
                    });
                }
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating vehicle status:', error);
        return false;
    }
};

const markVehicleUnavailable = async (vehicleId, returnDate, bookingId) => {
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return false;
        }

        // Update vehicle status
        vehicle.availability = 'Not available';
        await vehicle.save();

        // Schedule the vehicle to become available again after return date
        const returnDateTime = new Date(returnDate);
        const nextDay = new Date(returnDateTime);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);

        // Schedule the job to make vehicle available again
        schedule.scheduleJob(nextDay, async () => {
            vehicle.availability = 'Available';
            await vehicle.save();
        });

        return true;
    } catch (error) {
        console.error('Error marking vehicle unavailable:', error);
        return false;
    }
};

module.exports = { 
    searchVehicles,
    markVehicleUnavailable,
    updateVehicleStatus
};