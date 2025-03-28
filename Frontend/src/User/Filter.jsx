import "./Vehicle.css";
import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    console.log("🔥 Filter Selected in Filter.js:", selectedValue);
    setSelectedFilter(selectedValue);
    onFilterChange(selectedValue); // ✅ Send filter to Admincarspage
  };

  return (
    <div className="filter-container">
      {[
        "All",
        "Cars",
        "Bikes",
        "Available",
        "Not available",
        "Price",
        "Rating",
      ].map((option) => (
        <label key={option} className="filter-option">
          <input
            type="radio"
            name="filter"
            value={option}
            checked={selectedFilter === option}
            onChange={handleFilterChange}
          />
          <span
            className={`circle ${selectedFilter === option ? "checked" : ""}`}
          ></span>
          {option}
        </label>
      ))}
    </div>
  );
}

export default Filter;