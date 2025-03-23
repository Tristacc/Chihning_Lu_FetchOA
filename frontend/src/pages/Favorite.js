import React, { useState, useEffect, use } from "react";
import DogCards from "../components/DogCards";
import "./Favorite.css";

const Favorite = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:3001/favorite");
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
    </div>
  );
};
export default Favorite;
