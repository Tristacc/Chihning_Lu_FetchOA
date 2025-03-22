import React, { useState } from "react";
const ZipCodeSelector = ({ onSubmit }) => {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeArray, setZipCodeArray] = useState([]);

  const handleZipCodeChange = (event) => {
    const value = event.target.value;

    setZipCode(value);
  };

  const addZipCode = () => {
    if (zipCode.length === 5 && !zipCodeArray.includes(zipCode)) {
      const newZipCodeArray = [...zipCodeArray, zipCode];
      setZipCodeArray(newZipCodeArray);
      onSubmit(newZipCodeArray);
    }
    setZipCode("");
  };
  const clearZipCode = () => {
    setZipCodeArray([]);
    setZipCode("");
    onSubmit([]);
  };

  return (
    <div className="zip-code-selector">
      <h2>ZipCode</h2>
      <form>
        <label htmlFor="zipCode">ZIP Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={handleZipCodeChange}
          maxLength="5"
          placeholder="Enter ZIP code"
          pattern="\d{5}"
          required
        />
        <button type="button" onClick={addZipCode}>
          Add
        </button>
        <button type="button" onClick={clearZipCode}>
          Clear
        </button>
      </form>
      <h4>Selected Zipcode</h4>
      <ul>
        {zipCodeArray.map((zipCode, index) => (
          <li key={index}>{zipCode}</li>
        ))}
      </ul>
    </div>
  );
};

export default ZipCodeSelector;
