import React, { useState, useEffect, use } from "react";
import DogCards from "../components/DogCards";
import "./Favorite.css";

const Favorite = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState([]);
  const [foundMatch, setFoundMatch] = useState(false);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://18.220.119.210/favorite");
        const data = await response.json();
        console.log(data.favorites);
        setDogs(data.favorites);
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResults();
  }, []);

  const toggleFavorite = () => {};

  const backToSearch = () => {
    window.location.href = "/home";
  };

  const findMatch = async () => {
    try {
      const response = await fetch("http://18.220.119.210/favorite/match");
      const data = await response.json();
      setMatch(data.match);
      console.log(data.match);
      setFoundMatch(true);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div>
      <button onClick={backToSearch}>Back to Search</button>
      <div className="dog-cards-container">
        {dogs.map((dog, index) => (
          <DogCards
            key={index}
            dog={dog}
            isFavorite={favorites.some((fav) => fav.id === dog.id)}
            onToggleFavorite={toggleFavorite}
            showButton={false}
          />
        ))}
      </div>
      <button onClick={findMatch}>Find Match</button>
      {foundMatch && (
        <div>
          <h2>Match</h2>
          <div className="match-dog-card">
            <div className="dog-image-container">
              <img
                src={match.img}
                alt={`${match.name} the ${match.breed}`}
                className="dog-image"
              />
            </div>
            <div className="dog-info">
              <h2 className="dog-name">{match.name}</h2>
              <p className="dog-breed">{match.breed}</p>
              <div className="dog-details">
                <p>Age: {match.age}</p>
                <p>Location: {match.zip_code}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Favorite;
