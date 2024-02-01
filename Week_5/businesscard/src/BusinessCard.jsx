import React from 'react';
import './BusinessCard.css';  

const BusinessCard = (props) => {
  return (
    <div className="business-card">
      <h1>{props.name}</h1>
      <p>{props.description}</p>

      <div className="interests-container">
        <h2>Interests:</h2>
        <ul className="interests-list">
          {props.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>

      <div className="button-container">
        <button type='button' className="social-button"><a href='/'>Twitter</a></button>
        <button type='button' className="social-button"><a href='/'>LinkedIn</a></button>
      </div>
    </div>
  );
};

export default BusinessCard;
