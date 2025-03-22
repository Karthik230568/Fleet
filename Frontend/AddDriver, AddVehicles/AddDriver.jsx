import React, { useState } from "react";
import "./AddDriver.css";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
    license: "",
    vehicleId: "",
    driverId: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validationFunctions = {
    name: (value) => (!value ? "Name is required." : ""),
    age: (value) => {
      if (!value) return "Age is required.";
      if (isNaN(value) || value <= 18) return "Age must be over 18.";
      return "";
    },
    address: (value) => (!value ? "Address is required." : ""),
    phone: (value) => {
      if (!value) return "Phone is required.";
      if (!/^\d{10}$/.test(value)) return "Phone must be a 10-digit number.";
      return "";
    },
    license: (value) => {
      if (!value) return "License is required.";
      const licensePattern = /^[A-Z]{2}\d{2}\d{4}\d{7}$/;
      if (!licensePattern.test(value)) return "Invalid license number.";
      return "";
    },
    vehicleId: (value) => (!value ? "Vehicle ID is required." : ""),
    driverId: (value) => (!value ? "Driver ID is required." : ""),
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
      name: "",
      age: "",
      address: "",
      phone: "",
      license: "",
      vehicleId: "",
      driverId: "",
      photo: null,
    });

    // setErrors({});
    // alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <h2>Enter Driver Details</h2>
      <form onSubmit={handleSubmit}>
        {[
          {
            label: "Name",
            type: "text",
            name: "name",
            placeholder: "Enter name",
          },
          {
            label: "Age",
            type: "number",
            name: "age",
            placeholder: "Enter age",
          },
          {
            label: "Address",
            type: "text",
            name: "address",
            placeholder: "Enter address",
          },
          {
            label: "Phone",
            type: "text",
            name: "phone",
            placeholder: "Enter phone",
          },
          {
            label: "License",
            type: "text",
            name: "license",
            placeholder: "Enter license",
          },
          {
            label: "Vehicle ID",
            type: "text",
            name: "vehicleId",
            placeholder: "Enter vehicle ID",
          },
          {
            label: "Driver ID",
            type: "text",
            name: "driverId",
            placeholder: "Enter driver ID",
          },
          {
            label: "Photo",
            type: "file",
            name: "photo",
            placeholder: "Upload photo",
          },
        ].map(({ label, type, name, placeholder }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <div>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={type === "file" ? undefined : formData[name]}
                onChange={handleChange}
              />
              {errors[name] && <p className="error">{errors[name]}</p>}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDriver;
