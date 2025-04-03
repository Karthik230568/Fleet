const express = require("express");
const router = express.Router();
const {
  searchVehicles,
  markVehicleUnavailable,
  updateVehicleStatus,
} = require("../controllers/vehicleController");

// Fetch all vehicles (with optional filters)
router.get("/", searchVehicles);

// Add a new vehicle
router.post("/", async (req, res) => {
  try {
    const vehicleData = req.body;
    const newVehicle = await Vehicle.create(vehicleData);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: "Error adding vehicle" });
  }
});

// Update a vehicle's status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Error updating vehicle" });
  }
});

// Delete a vehicle
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting vehicle" });
  }
});

// Mark a vehicle as unavailable
router.post("/:id/unavailable", async (req, res) => {
  try {
    const { id } = req.params;
    const { returnDate, bookingId } = req.body;
    const result = await markVehicleUnavailable(id, returnDate, bookingId);
    if (!result) {
      return res.status(404).json({ error: "Vehicle not found or error occurred" });
    }
    res.status(200).json({ message: "Vehicle marked as unavailable" });
  } catch (error) {
    res.status(500).json({ error: "Error marking vehicle unavailable" });
  }
});

module.exports = router;