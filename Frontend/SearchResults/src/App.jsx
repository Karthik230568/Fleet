import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
    <body>
    <header className="header">
        <div className="logo">
          <img src="/Logo.png" alt="🚗 FLEET" />
        </div>
        <div className="buttons">
          <button className="help-btn">Help</button>
          <button className="bookings-btn">Bookings</button>
          <div className="profile-icon">A</div>
        </div>
      </header>
  <div className="container">
      <div className="logobg">
        <img src="/logobg.jpg" alt="🚗 FLEET" />
      </div>
      <div className="card">
        <select className="select">
          <option>Select City</option>
        </select>

        <div className="Pickup">
          <p>Pickup Date</p>
          <p>Pickup Time</p>
        </div>
        
        <div className="input-group">
          <input type="date" className="input" placeholder="Pickup Date" />
          <input type="time" className="input" placeholder="Pickup Time" />
        </div>

        <div className="Return">
          <p>Return Date</p>
          <p>Return Time</p>
        </div>
        
        
        <div className="input-group">
          <input type="date" className="input" placeholder="Return Date" />
          <input type="time" className="input" placeholder="Return Time" />
        </div>
        
        
        <div className=" radio-group">
          <label className="radio-option1"><input type="radio" name="drive" value="driver" /> With Driver</label>
          <label className="radio-option2"><input type="radio" name="drive" value="own" /> Own Driving</label>
        </div>
        
        <button className="button">Search Results</button>
      </div>
    </div>
    </body>
 
    </>
  )
}

export default App
