import "./Styles.css";
import React from "react";

function Filter() {
  return (
    <div class="filter-container">
      <label class="filter-option">
        <input type="radio" name="filter" checked />
        <span class="circle"></span> All
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Bikes
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Price
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Rating
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Cars
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Vans
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Available
      </label>

      <label class="filter-option">
        <input type="radio" name="filter" />
        <span class="circle"></span> Not available
      </label>
    </div>
  );
}

export default Filter;
