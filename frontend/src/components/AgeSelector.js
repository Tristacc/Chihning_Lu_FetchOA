import React, { useState } from "react";

const AgeSelector = ({ onAgeChange }) => {
  const [ageRange, setAgeRange] = useState({ min: 0, max: 20 });

  const handleAgeChange = (event) => {
    const { name, value } = event.target;
    const newAgeRange = {
      ...ageRange,
      [name]: parseInt(value),
    };
    setAgeRange(newAgeRange);
    onAgeChange(newAgeRange);
  };

  return (
    <div className="age-selector">
      <h4>Age Range</h4>
      <div className="age-inputs">
        <div>
          <label htmlFor="min">Min Age:</label>
          <input
            type="number"
            id="min"
            name="min"
            value={ageRange.min}
            onChange={handleAgeChange}
            min="0"
            max={ageRange.max}
          />
        </div>
        <div>
          <label htmlFor="max">Max Age:</label>
          <input
            type="number"
            id="max"
            name="max"
            value={ageRange.max}
            onChange={handleAgeChange}
            min={ageRange.min}
            max="20"
          />
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
