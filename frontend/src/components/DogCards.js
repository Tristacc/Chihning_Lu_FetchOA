import React from "react";
import "./DogCards.css";

const DogCards = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <div>
      <div key={dog.id} className="dog-card">
        <div className="dog-image-container">
          <img
            src={dog.img}
            alt={`${dog.name} the ${dog.breed}`}
            className="dog-image"
          />
        </div>
        <div className="dog-info">
          <h2 className="dog-name">{dog.name}</h2>
          <p className="dog-breed">{dog.breed}</p>
          <div className="dog-details">
            <p>Age: {dog.age}</p>
            <p>Location: {dog.zip_code}</p>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(dog)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default DogCards;
