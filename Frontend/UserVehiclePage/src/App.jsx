// import "./Styles.css";
// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import Filter from "./Filter";
// import carData from "./Vehicle_data";
// import Card from "./Card";

// function App() {
//   const [vehicles, setVehicles] = useState(carData); 
//   const addVehicle = () => {
//     const newVehicle = {
//       type: "Car",
//       name: "New Vehicle",
//       price: "0000INR/day",
//       availability: "Yes",
//       rating: "0.0/5",
//       image: "Images/placeholder.png",
//     };

//     setVehicles([...vehicles, newVehicle]);
//   };

//   return (
//     <div className="main">
//       <Navbar />
//       <Filter />
//       <div className="card-container">
//         {vehicles.map((vehicle, index) => (
//           <Card
//             key={index}
//             name={vehicle.name}
//             image={vehicle.image}
//             price={vehicle.price}
//             availability={vehicle.availability}
//             rating={vehicle.rating}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// export default App;

import "./Styles.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import carData from "./Vehicle_data";
import Card from "./Card";

function App() {
  const [vehicles, setVehicles] = useState(carData);
  const [selectedFilter, setSelectedFilter] = useState("All"); // State to manage the selected filter

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter the vehicles based on the selected filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (selectedFilter === "All") {
      return true; // Show all vehicles
    } else if (selectedFilter === "Bikes") {
      return vehicle.type === "Bike";
    } else if (selectedFilter === "Cars") {
      return vehicle.type === "Car";
    } else if (selectedFilter === "Vans") {
      return vehicle.type === "Van";
    } else if (selectedFilter === "Available") {
      return vehicle.availability === "Yes";
    } else if (selectedFilter === "Not available") {
      return vehicle.availability === "No";
    } else if (selectedFilter === "Price") {
      // Sort by price (assuming price is a string like "1000INR/day")
      return vehicles.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedFilter === "Rating") {
      // Sort by rating (assuming rating is a string like "4.5/5")
      return vehicles.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }
    return true;
  });

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
      <Filter onFilterChange={handleFilterChange} /> {/* Pass the handler to Filter */}
      <div className="card-container">
        {filteredVehicles.map((vehicle, index) => (
          <Card
            key={index}
            name={vehicle.name}
            image={vehicle.image}
            price={vehicle.price}
            availability={vehicle.availability}
            rating={vehicle.rating}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;