import "./Styles.css";
import React from "react";

function Navbar() {
  return (
    <div className="App">
      <nav class="navbar">
        <div class="logo">
          <img src="fleet_logo.png" alt="Car Icon" />
          <span>FLEET</span>
        </div>
        <div class="nav-links">
          <a href="#" class="signup-btn">
            A
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;