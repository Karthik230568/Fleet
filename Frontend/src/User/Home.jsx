import './Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useBookingStore from './../../store/BookingStore.js'; // Import Zustand store
import blacklogo from "../Admin/src/blacklogo.png";

function Home() {
  const navigate = useNavigate();

  // Zustand store actions and state
  const {
    setPickupDate,
    setReturnDate,
    setBookingType,
    setCity,
    initializeBooking,
    error,
  } = useBookingStore();

  const [city, setLocalCity] = useState('');
  const [pickupDate, setLocalPickupDate] = useState('');
  const [pickupTime, setLocalPickupTime] = useState('');
  const [returnDate, setLocalReturnDate] = useState('');
  const [returnTime, setLocalReturnTime] = useState('');
  const [bookingType, setLocalBookingType] = useState(() => {
    return localStorage.getItem('bookingType') || '';
  });

  const handleBookingTypeChange = (event) => {
    const selectedBookingType = event.target.value;
    setLocalBookingType(selectedBookingType);
    setBookingType(selectedBookingType); // Update Zustand store
    localStorage.setItem('bookingType', selectedBookingType);
  };

  const handleSearch = async () => {
    try {
      // Combine date and time for pickup and return
      const fullPickupDate = `${pickupDate}T${pickupTime}`;
      const fullReturnDate = `${returnDate}T${returnTime}`;

      // Update Zustand store
      setPickupDate(fullPickupDate);
      setReturnDate(fullReturnDate);
      setCity(city);

      // Send data to the backend
      const response = await initializeBooking();
      console.log("Booking initialized successfully:", response);

      // Navigate to the vehicles page with booking details
      navigate('/home/vehicles', { state: { bookingType } });
    } catch (error) {
      console.error("Error during booking initialization:", error);
    }
  };

  useEffect(() => {
    const storedBookingType = localStorage.getItem('bookingType');
    if (storedBookingType) {
      setLocalBookingType(storedBookingType);
    }
  }, []);

  return (
    <>
      <div className="body_home">
        <div className="container_home">
          <div className="BLogo_home">
            <img src={blacklogo} alt="Fleet Logo" className="main-logo" />
            <h1 className="title">FLEET</h1>
            <p className="tagline">DRIVE YOUR JOURNEY ANYTIME, ANYWHERE</p>
          </div>
          <div className="card_home">
            <select
              className="select_home"
              value={city}
              onChange={(e) => setLocalCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>

            <div className="Pickup_home">
              <p>Pickup Date</p>
              <p>Pickup Time</p>
            </div>

            <div className="input-group_home">
              <input
                type="date"
                className="input_home"
                value={pickupDate}
                onChange={(e) => setLocalPickupDate(e.target.value)}
              />
              <input
                type="time"
                className="input_home"
                value={pickupTime}
                onChange={(e) => setLocalPickupTime(e.target.value)}
              />
            </div>

            <div className="Return_home">
              <p>Return Date</p>
              <p>Return Time</p>
            </div>

            <div className="input-group_home">
              <input
                type="date"
                className="input_home"
                value={returnDate}
                onChange={(e) => setLocalReturnDate(e.target.value)}
              />
              <input
                type="time"
                className="input_home"
                value={returnTime}
                onChange={(e) => setLocalReturnTime(e.target.value)}
              />
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

            <button onClick={handleSearch} className="button_home">
              Search Results
            </button>

            {error && <p className="error_message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;