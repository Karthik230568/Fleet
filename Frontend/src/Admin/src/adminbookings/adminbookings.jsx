import React from "react";
import "./adminbookings.css";
import AdminbookingList from "./bookinglist";
import Calendar from "./calendar";
import Adminbookingssidebar from "./sidebar";
//import { useNavigate } from "react-router-dom";
function Adminbookingspage() {
  const bookings = [
  
    {
      id: 2,
      vehicle: "KTM RC 360",
      pickupDate: "04/02/2025 17:00",
      duration: "2 days 21 hours",
      returnDate: "06/02/2025 14:00",
      totalAmount: "5000 INR",
      user: "Sai@gmail.com",
      driverName: "Sai",
      vehicleId: "1234567890",
    },
    
    
    
    {
      id: 1,
      vehicle: "Hyundai i30",
      pickupDate: "31/01/2025 11:00",
      duration: "5 days 3 hours",
    returnDate: "05/02/2025 14:00",
      totalAmount: "20000 INR",
      user: "Sai@gmail.com",
      driverName: "Sai",
      vehicleId: "1234567890",
    }
    
    
    
  ];

  return (
    <div className="app">
      <div className="sidebar">
        <Calendar />
      </div>
      <div className="main-content">
       <AdminbookingList bookings={bookings} />
      </div>
    </div>
  );
}

export default Adminbookingspage;
