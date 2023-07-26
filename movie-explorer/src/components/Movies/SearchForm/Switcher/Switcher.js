import React from "react";

import "./Switcher.css";

function Switcher({ isChecked, onChecked }) {
  const handleCheckboxChange = (event) => {
    onChecked(event.target.checked);
  };

  return (
    <label className="switcher">
      <input
        className="switcher__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="switcher__slider"></span>
    </label>
  );
}

export default Switcher;
