import { useState } from 'react'
import './Profile.css'
import blacklogo from '../Admin/src/blacklogo.png';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
   
    dateOfBirth: "",
    address: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="profile-main-container">
      <div className="profile-container">
        <div className="profile_BLogo_home">
          <img src={blacklogo} alt="Fleet Logo" className="profile-logo" />
          <h1 className="profile-title">FLEET</h1>
          <p className="profile-tagline">DRIVE YOUR JOURNEY ANYTIME, ANYWHERE</p>
        </div>
        <div className="profile-card">
          <div className="profile-input-container">
            <button className="profile-edit-btn" onClick={handleEditClick}>✏️</button>
          </div>
          <h6>Full Name</h6>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className={`profile-input-field ${isEditing ? "editing" : "disabled"}`}
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          
          <h6>Phone Number</h6>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className={`profile-input-field ${isEditing ? "editing" : "disabled"}`}
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
          
          <h6>Date of Birth</h6>
          <input
            type="date"
            name="dateOfBirth"
            className={`profile-input-field ${isEditing ? "editing" : "disabled"}`}
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <h6>Address</h6>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className={`profile-input-field ${isEditing ? "editing" : "disabled"}`}
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {isEditing && (
            <button className="profile-save-button" onClick={handleSaveClick}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile