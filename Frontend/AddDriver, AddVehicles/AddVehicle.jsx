import React, { useState } from "react";
import "./AddVehicle.css";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    vehicleModel: "",
    fuelType: "",
    seatingCapacity: "",
    pricePerDay: "",
    registrationPlate: "",
    vehicleId: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [customFuelType, setCustomFuelType] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFuelTypeChange = (e) => {
    const { value } = e.target;
    if (value === "Others") {
      setCustomFuelType(true);
      setFormData((prev) => ({ ...prev, fuelType: "" }));
    } else {
      setCustomFuelType(false);
      setFormData((prev) => ({ ...prev, fuelType: value }));
    }
  };

  const validationFunctions = {
    vehicleModel: (value) => (!value ? "Vehicle model is required." : ""),
    fuelType: (value) => (!value ? "Fuel type is required." : ""),
    seatingCapacity: (value) => {
      if (!value) return "Seating capacity is required.";
      if (isNaN(value) || value <= 0)
        return "Seating capacity must be a positive number.";
      return "";
    },
    pricePerDay: (value) => {
      if (!value) return "Price per day is required.";
      if (isNaN(value) || value <= 0)
        return "Price per day must be a positive number.";
      return "";
    },
    registrationPlate: (value) =>
      !value ? "Registration plate is required." : "",
    vehicleId: (value) => (!value ? "Vehicle ID is required." : ""),
    photo: (value) => {
      if (!value) return "Photo is required.";
      if (value && value.type !== "image/jpeg")
        return "Photo must be a .jpg file.";
      return "";
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const validate = validationFunctions[key];
      if (validate) {
        const error = validate(formData[key]);
        if (error) newErrors[key] = error;
      } else if (formData[key] === "" || formData[key] === null) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear form on success
    setFormData({
      vehicleModel: "",
      fuelType: "",
      seatingCapacity: "",
      pricePerDay: "",
      registrationPlate: "",
      vehicleId: "",
      photo: null,
    });

    // setErrors({});
    // alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <h2>Enter Vehicle Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle Model:</label>
          <div>
            <input
              type="text"
              name="vehicleModel"
              placeholder="Enter vehicle model"
              value={formData.vehicleModel}
              onChange={handleChange}
            />
            {errors.vehicleModel && (
              <p className="error">{errors.vehicleModel}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Fuel Type:</label>
          <div>
            {!customFuelType ? (
              <select name="fuelType" onChange={handleFuelTypeChange}>
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <input
                type="text"
                name="fuelType"
                placeholder="Enter fuel type"
                value={formData.fuelType}
                onChange={handleChange}
              />
            )}
            {errors.fuelType && <p className="error">{errors.fuelType}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Seating Capacity:</label>
          <div>
            <input
              type="text"
              name="seatingCapacity"
              placeholder="Enter seating capacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
            />
            {errors.seatingCapacity && (
              <p className="error">{errors.seatingCapacity}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Price Per Day:</label>
          <div>
            <input
              type="text"
              name="pricePerDay"
              placeholder="Enter price per day"
              value={formData.pricePerDay}
              onChange={handleChange}
            />
            {errors.pricePerDay && (
              <p className="error">{errors.pricePerDay}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Registration Plate:</label>
          <div>
            <input
              type="text"
              name="registrationPlate"
              placeholder="Enter registration plate"
              value={formData.registrationPlate}
              onChange={handleChange}
            />
            {errors.registrationPlate && (
              <p className="error">{errors.registrationPlate}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Vehicle ID:</label>
          <div>
            <input
              type="text"
              name="vehicleId"
              placeholder="Enter vehicle ID"
              value={formData.vehicleId}
              onChange={handleChange}
            />
            {errors.vehicleId && <p className="error">{errors.vehicleId}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <div>
            <input
              type="file"
              name="photo"
              placeholder="Upload photo"
              onChange={handleChange}
            />
            {errors.photo && <p className="error">{errors.photo}</p>}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddVehicle;
