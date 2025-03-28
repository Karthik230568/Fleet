import React from "react";
import "./userpickup.css";
import Logo from "./fulllogo.jpg";
import Map from "./map.jpg";
import { NavLink } from 'react-router-dom';

function Userpickup() {
    return (
      <div class="pickup_body">
        <div class="pickup_logo-container">
          <img src={Logo} class="pickup_logo-image" alt="Logo"/>
        </div>
        <div class="pickup_location">
          <div class="pickup_location-1">
            <img src={Map} alt="Map Logo"/>
            <span>Enter the pickup location</span>
          </div>
        </div>
      <NavLink to='/home/userpayment' class="pickup_next-button">Next</NavLink>
    </div>
    );
  }
  export default Userpickup;