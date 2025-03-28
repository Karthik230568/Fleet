import './Home.css'
import {NavLink} from 'react-router-dom';

function Home() {


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
        
        
        <div className=" radio-group_home">
          <label className="radio-option1_home"><input type="radio" name="drive" value="driver" /> With Driver</label>
          <label className="radio-option2_home"><input type="radio" name="drive" value="own" /> Own Driving</label>
        </div>
        
        <NavLink to='/home/vehicles' className="button_home">Search Results</NavLink>
      </div>
    </div>
    </div>
 
    </>
  )
}

export default Home