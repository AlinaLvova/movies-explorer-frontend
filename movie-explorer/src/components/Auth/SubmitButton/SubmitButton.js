import React, { useState } from "react";

import "./SubmitButton.css";

function SubmitButton({ title, onClick, isActive, errorMessage }) {
  const handleClick = () => {
    //onClick();
  };

  return (
    <>
    <span className={`submit-button-error-message ${errorMessage !== '' ? "active" : ""}`}>{errorMessage}</span>
    <button
      type="submit"
      className={`submit-button link ${
        !isActive ? "submit-button_inactive" : ""
      }`}
      disabled={!isActive}
    >
      {title}
    </button>
    </>
  );
}

export default SubmitButton;
