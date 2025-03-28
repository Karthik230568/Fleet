import React from "react";
import "./adminbookings.css";
import AdminbookingList from "./bookinglist";
import Adminbookingssidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
function Adminbookingspage() {
  const bookings = [
  
    {
      id: 2,
      vehicle: "KTM RC 360",
      startDate: "04/02/2025 17:00",
      duration: "2 days 21 hours",
      endDate: "06/02/2025 14:00",
      provider: "SHIVA RENTALS",
      price: "5000 INR",
      user: "Sai",
    },
    {
      id: 3,
      vehicle: "Mahindra XUV 700",
      startDate: "05/02/2025 11:00",
      duration: "1 day 3 hours",
      endDate: "06/02/2025 14:00",
      provider: "REKHA TRAVELS",
      price: "14000 INR",
      user: "Sai",
    },
    
    
    {
      id: 1,
      vehicle: "Hyundai i30",
      startDate: "31/01/2025 11:00",
      duration: "5 days 3 hours",
      endDate: "05/02/2025 14:00",
      provider: "SHREE SAI RENTALS",
      price: "20000 INR",
      user: "Sai",
    }
    
    
    
  ];

  return (
    <div className="app">
      
      <Adminbookingssidebar />
      <div className="main-content">

        <AdminbookingList bookings={bookings} />
      </div>
    </div>
  );
}

export default Adminbookingspage;
