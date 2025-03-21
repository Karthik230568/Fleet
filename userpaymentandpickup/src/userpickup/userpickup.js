import React from "react";
import "./userpickup.css";
import Logo from "../fulllogo.jpg";
import Map from "../map.jpg";

function Userpickup() {
    return (
      <div class="body">
        <div class="logo-container">
          <img src={Logo} class="logo-image" alt="Logo"/>
        </div>
        <div class="location">
          <div class="location-1">
            <img src={Map} alt="Map Logo"/>
            <span>Enter the pickup location</span>
          </div>
        </div>
      <button class="next-button">Next</button>
    </div>
    );
  }
  export default Userpickup;