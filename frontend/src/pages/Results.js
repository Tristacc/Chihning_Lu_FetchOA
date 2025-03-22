import React, { useState, useEffect } from "react";
import DogCards from "../components/DogCards";
import "./Results.css";

const Results = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:3001/results");
        const data = await response.json();
        setDogs(data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const backToSearch = () => {
    window.location.href = "/home";
  };

  const toggleFavorite = (dog) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.some((fav) => fav.id === dog.id)
        ? prevFavorites.filter((fav) => fav.id !== dog.id)
        : [...prevFavorites, dog];

      return updatedFavorites;
    });
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
          />
        ))}
      </div>
    </div>
  );
};
export default Results;
