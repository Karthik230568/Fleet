import React, { useState } from 'react';
import './DetailsForm.css';
import Logo1 from './Logo[1].png';
import Logo from './logo.jpg';

function DetailsForm() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    DateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="details-form-wrapper">
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="buttons">
          <button className="help-btn">Contact Us</button>
          <button className="bookings-btn">Help</button>
          <div className="profile-icon">A</div>
        </div>
      </header>
      <div className="details-form-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <form className="details-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              placeholder="Enter your first name"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              placeholder="Enter your last name"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input
              type="tel"
              id="PhoneNumber"
              name="PhoneNumber"
              placeholder="Enter your phone number"
              value={formData.PhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="DateOfBirth"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default DetailsForm;
