import React, { useState } from "react";

import "./SubmitButton.css";

function SubmitButton({ title, onClick, isActive }) {
  const handleClick = () => {
    //onClick();
  };

  return (
    <button
      //onClick={handleClick}
      type="submit"
      className={`submit-button link ${
        !isActive ? "submit-button_inactive" : ""
      }`}
      disabled={!isActive}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
