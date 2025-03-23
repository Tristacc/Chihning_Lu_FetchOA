import React, { useState, useEffect } from "react";
import "./DogCards.css";

const DogCards = ({
  dog,
  isFavorite,
  location,
  onToggleFavorite,
  showButton,
}) => {
  const [loc, setLoc] = useState([]);
  const [clicked, setClicked] = useState(false);
  const getLocation = async () => {
    setClicked(!clicked);
    try {
      const response = await fetch("http://localhost:3001/results/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zipCode: dog.zip_code,
        }),
      });
      const data = await response.json();
      setLoc(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

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

            <button onClick={getLocation}>
              {clicked ? "less details" : "Location"}
            </button>
            {clicked && (
              <div>
                <p>city: {loc.city}</p>
                <p>latitude: {loc.latitude}</p>
                <p>count: {loc.county}</p>
                <p>state: {loc.state}</p>
                <p>zip_code: {loc.zip_code}</p>
                <p>longitude: {loc.longitude}</p>
              </div>
            )}
          </div>
        </div>
        {showButton && (
          <button onClick={() => onToggleFavorite(dog)}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DogCards;
