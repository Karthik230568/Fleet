import './Home.css'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [bookingType, setBookingType] = useState(() => {
    // Retrieve the bookingType from localStorage if it exists
    return localStorage.getItem('bookingType') || '';
  });

  const handleBookingTypeChange = (event) => {
    const selectedBookingType = event.target.value;
    setBookingType(selectedBookingType);
    // Store the selected bookingType in localStorage
    localStorage.setItem('bookingType', selectedBookingType);
  };

  useEffect(() => {
    // Retrieve the bookingType from localStorage when the component mounts
    const storedBookingType = localStorage.getItem('bookingType');
    if (storedBookingType) {
      setBookingType(storedBookingType);
    }
  }, []);

  return (
    <>
      <div className="body_home">
        <div className="container_home">
          <div className="BLogo_home">
            <img src="/BLogo.jpg" alt="🚗 FLEET" />
          </div>
          <div className="card_home">
            <select className="select_home">
              <option>Select City</option>
            </select>

            <div className="Pickup_home">
              <p>Pickup Date</p>
              <p>Pickup Time</p>
            </div>

            <div className="input-group_home">
              <input type="date" className="input_home" placeholder="Pickup Date" />
              <input type="time" className="input_home" placeholder="Pickup Time" />
            </div>

            <div className="Return_home">
              <p>Return Date</p>
              <p>Return Time</p>
            </div>

            <div className="input-group_home">
              <input type="date" className="input_home" placeholder="Return Date" />
              <input type="time" className="input_home" placeholder="Return Time" />
            </div>

            <div className="radio-group_home">
              <label className="radio-option1_home">
                <input
                  type="radio"
                  name="drive"
                  value="driver"
                  checked={bookingType === 'driver'}
                  onChange={handleBookingTypeChange}
                /> With Driver
              </label>
              <label className="radio-option2_home">
                <input
                  type="radio"
                  name="drive"
                  value="own"
                  checked={bookingType === 'own'}
                  onChange={handleBookingTypeChange}
                /> Own Driving
              </label>
            </div>

        
        
            <NavLink
              to={{
                pathname: '/home/vehicles',
                state: { bookingType }
              }}
              className="button_home"
            >
              Search Results
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;