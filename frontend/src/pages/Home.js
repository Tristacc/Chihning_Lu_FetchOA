import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown.js";
import ZipCodeSelector from "../components/ZipCodeSelector.js";
import AgeSelector from "../components/AgeSelector.js";
import Toggle from "../components/Toggle.js";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [selectedBreedsArray, setSelectedBreedsArray] = useState([]);
  const [zipCodeArray, setZipCodeArray] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 20 });
  const [size, setSize] = useState(25);
  const [sortOrder, setSortOrder] = useState("asc");
  const [field, setField] = useState("breed");
  const fields = ["breed", "name", "age"];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("http://localhost:3001/home");
        const data = await response.json();
        // console.log("this is the data for breed", data.breeds);
        setBreeds(data.breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  // track the selected breeds
  const handleBreedsChange = (event) => {
    const options = event.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        // console.log(options[i].value);
        setSelectedBreeds(options[i].value);
      }
    }
  };

  const addBreed = () => {
    // avoid duplicates
    for (let i = 0; i < selectedBreedsArray.length; i++) {
      if (selectedBreedsArray[i] === selectedBreeds) {
        return;
      }
    }
    setSelectedBreedsArray([...selectedBreedsArray, selectedBreeds]);
  };

  const clearBreed = () => {
    setSelectedBreedsArray([]);
  };

  const zipCodesChange = (zipCodeArray) => {
    setZipCodeArray(zipCodeArray);
    console.log("this is the zipcode: ", zipCodeArray);
  };

  const handleAgeChange = (newAgeRange) => {
    setAgeRange(newAgeRange);
  };

  const getAllInfo = async () => {
    console.log(sortOrder);
    try {
      const response = await fetch("http://localhost:3001/home/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedBreeds: selectedBreedsArray,
          zipCodes: zipCodeArray,
          ageRange: ageRange,
          size: size,
          field: field,
          order: sortOrder,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      navigate("/results");
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const handleFieldChange = (e) => {
    setField(e.target.value);
  };

  const handleToggleChange = (newValue) => {
    setSortOrder(newValue);
  };

  return (
    <div>
      <form>
        <Dropdown
          label="Breeds:"
          options={breeds}
          onChange={handleBreedsChange}
          name="breeds"
        />
        <button type="button" onClick={addBreed}>
          Add Breed
        </button>
        <button type="button" onClick={clearBreed}>
          Clear
        </button>
      </form>
      <h4>Selected breeds</h4>
      <ul>
        {selectedBreedsArray.map((breed, index) => (
          <li key={index}>{breed}</li>
        ))}
      </ul>
      <ZipCodeSelector onSubmit={zipCodesChange} />
      <AgeSelector onAgeChange={handleAgeChange} />
      <label>
        <h4>Number of results(1~10000) & sort field:</h4>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          min="1"
          max="10000"
        />
      </label>
      <select onChange={handleFieldChange}>
        {fields.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        <Toggle
          label="Sort Order"
          value={sortOrder}
          onChange={handleToggleChange}
        />
      </div>
      <button type="button" onClick={getAllInfo}>
        Search
      </button>
    </div>
  );
};

export default Home;
