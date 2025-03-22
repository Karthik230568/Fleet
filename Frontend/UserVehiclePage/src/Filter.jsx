// import "./Styles.css";
// import React from "react";

// function Filter() {
//   return (
//     <div class="filter-container">
//       <label class="filter-option">
//         <input type="radio" name="filter" checked />
//         <span class="circle"></span> All
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Bikes
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Price
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Rating
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Cars
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Vans
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Available
//       </label>

//       <label class="filter-option">
//         <input type="radio" name="filter" />
//         <span class="circle"></span> Not available
//       </label>
//     </div>
//   );
// }

// export default Filter;

//-------------------------


// import "./Styles.css";
// import React, { useState } from "react";

// function Filter() {
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   const handleFilterChange = (event) => {
//     setSelectedFilter(event.target.value);
//   };

//   return (
//     <div className="filter-container">
//       {["All", "Bikes", "Price", "Rating", "Cars", "Vans", "Available", "Not available"].map((filter) => (
//         <label key={filter} className="filter-option">
//           <input 
//             type="radio" 
//             name="filter" 
//             value={filter} 
//             checked={selectedFilter === filter} 
//             onChange={handleFilterChange} 
//           />
//           <span className="circle"></span> {filter}
//         </label>
//       ))}
//     </div>
//   );
// }

// export default Filter;

//--------------
// import "./Styles.css";
// import React from "react";

// function Filter({ setFilter }) {
//   const filters = ["All", "Bikes", "Cars", "Vans", "Available", "Not available"];

//   return (
//     <div className="filter-container">
//       {filters.map((filter) => (
//         <label key={filter} className="filter-option">
//           <input 
//             type="radio" 
//             name="filter" 
//             value={filter} 
//             onChange={(e) => setFilter(e.target.value)}
//           />
//           <span className="circle"></span> {filter}
//         </label>
//       ))}
//     </div>

//   );
// }

// // export default Filter;
// import "./Styles.css";
// import React from "react";

// function Filter({ setFilter }) {
//   const filters = ["All", "Bike", "Car", "Available", "Not available"];

//   return (
//     <div className="filter-container">
//       {filters.map((filter) => (
//         <label key={filter} className="filter-option">
//           <input 
//             type="radio" 
//             name="filter" 
//             value={filter} 
//             onChange={(e) => setFilter(e.target.value)}
//           />
//           <span className="circle"></span> {filter}
//         </label>
//       ))}
//     </div>
//   );
// }

// export default Filter;
//----------------------

// import "./Styles.css";
// import React, { useState } from "react";

// function Filter() {
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   const handleFilterChange = (event) => {
//     setSelectedFilter(event.target.value);
//   };

//   return (
//     <div className="filter-container">
//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="All"
//           checked={selectedFilter === "All"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> All
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Bikes"
//           checked={selectedFilter === "Bikes"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Bikes
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Price"
//           checked={selectedFilter === "Price"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Price
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Rating"
//           checked={selectedFilter === "Rating"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Rating
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Cars"
//           checked={selectedFilter === "Cars"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Cars
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Vans"
//           checked={selectedFilter === "Vans"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Vans
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Available"
//           checked={selectedFilter === "Available"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Available
//       </label>

//       <label className="filter-option">
//         <input
//           type="radio"
//           name="filter"
//           value="Not available"
//           checked={selectedFilter === "Not available"}
//           onChange={handleFilterChange}
//         />
//         <span className="circle"></span> Not available
//       </label>
//     </div>
//   );
// }

// export default Filter;

import "./Styles.css";
import React from "react";

function Filter({ onFilterChange }) {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value); // Pass the selected value to the parent component
  };

  return (
    <div className="filter-container">
      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="All"
          defaultChecked
          onChange={handleFilterChange}
        />
        <span className="circle"></span> All
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Bikes"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Bikes
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Price"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Price
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Rating"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Rating
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Cars"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Cars
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Vans"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Vans
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Available"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Available
      </label>

      <label className="filter-option">
        <input
          type="radio"
          name="filter"
          value="Not available"
          onChange={handleFilterChange}
        />
        <span className="circle"></span> Not available
      </label>
    </div>
  );
}

export default Filter;