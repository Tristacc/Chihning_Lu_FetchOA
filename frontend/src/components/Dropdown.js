import React from "react";

const Dropdown = ({ label, options = [], onChange, name }) => {
  return (
    <div>
      <h2>{label}</h2>
      <select multiple name={name} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
