import "./Styles.css";
import React from "react";

function Card(props) {
  if (props.isAddCard) {
    return (
      <div className="card add-card" onClick={props.onAdd}>
       <h2>+ Add Vehicle</h2>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} />
      <p>Price: {props.price}</p>
      <p>Availability: {props.availability}</p>
      <button className="details-btn">View Details</button>
      <span className="rating">{props.rating}</span>
    </div>
  );
}

export default Card;
