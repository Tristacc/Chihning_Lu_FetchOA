import React, { useState, useEffect } from "react";
import DogCards from "../components/DogCards";
import Pagination from "../components/Pagination";
import "./Results.css";

const Results = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  //for pagination
  const dogsPerPage = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage * dogsPerPage;
  const startIndex = endIndex - dogsPerPage;
  const currentDogs = dogs.slice(startIndex, endIndex);
  const numberOfPages = Math.ceil(dogs.length / dogsPerPage);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:3001/results");
        const data = await response.json();
        setDogs(data.results);
        setTotalPage(data.results.total);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResults();
  }, []);

  //keep track of favorites list
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:3001/results/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorites }),
        });

        if (!response.ok) {
          console.error("Failed to update favorites in the database");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [favorites]);

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

  const goToFav = () => {
    window.location.href = "/favorite";
  };
  return (
    <div>
      <button onClick={backToSearch}>Back to Search</button>
      <button onClick={goToFav}>Favorite list</button>
      <div className="dog-cards-container">
        {currentDogs.map((dog, index) => (
          <DogCards
            key={index}
            dog={dog}
            isFavorite={favorites.some((fav) => fav.id === dog.id)}
            onToggleFavorite={toggleFavorite}
            showButton={true}
          />
        ))}
      </div>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default Results;
