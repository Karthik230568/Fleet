import "./Styles.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import carData from "./Vehicle_data";
import Card from "./Card";

function App() {
  const [vehicles, setVehicles] = useState(carData);

  const addVehicle = () => {
    const newVehicle = {
      type: "Car",
      name: "New Vehicle",
      price: "0000INR/day",
      availability: "Yes",
      rating: "0.0/5",
      image: "Images/placeholder.png",
    };

    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <div className="main">
      <Navbar />
      <Filter />
      <div className="card-container">
        {vehicles.map((vehicle, index) => (
          <Card
            key={index}
            name={vehicle.name}
            image={vehicle.image}
            price={vehicle.price}
            availability={vehicle.availability}
            rating={vehicle.rating}
          />
        ))}
        <Card isAddCard={true} onAdd={addVehicle} />
      </div>
    </div>
  );
}

export default App;
