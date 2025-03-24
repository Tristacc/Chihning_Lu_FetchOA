import React from "react";
import "./Toggle.css";

const Toggle = ({ label, value, onChange }) => {
  return (
    <div className="toggle-container">
      <h2>{label}</h2>
      <div className="toggle-switch">
        <label>
          <input
            type="checkbox"
            checked={value === "asc"}
            onChange={(e) => onChange(e.target.checked ? "asc" : "desc")}
          />
          <span className="slider"></span>
        </label>
        <div className="toggle-labels">
          <span>Ascending</span>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
