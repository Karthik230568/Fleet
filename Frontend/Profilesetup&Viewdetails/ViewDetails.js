 
import React from 'react';
import './ViewDetails.css';
import Logo from './Logo.png';
import carImage from './car.jpeg';

const ViewDetails = () => {
  return (
    <div className="view-details-wrapper">
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

      <h2 className="title">Sri Sai Travels</h2>
      <div className="header-title">
    <h3>Vehicle Details</h3>
    <h3>Driver Details</h3>
</div>
      <div className="details-container">
        <div className="details-section vehicle-details">
         
          <img src={carImage} alt="Car" className="car-image" />
          <p>Hyundai i30</p>
          <p>👤 Size: 4+1</p>
          <p>Vehicle ID: 10</p>
          <p>Availability: Yes</p>
        </div>
        

        <div className="details-section driver-details">
        
          <p>Name: Prabhav</p>
          <p>Age: 30</p>
          <p>Gender: Male</p>
          <p>Driver ID: 100</p>
          <p>License ID: 100</p>
          <p>Rating: 4.50</p>
        </div>
      </div>
 
      <div className="comments-section">
        <h3>Comments</h3>
        <p> Great trip experience</p>
      </div>

      <div className="book-btn-container">
        <button className="book-btn">Book</button>
      </div>
    </div>
  );
};

export default ViewDetails;

