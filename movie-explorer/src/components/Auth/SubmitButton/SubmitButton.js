import React from "react";

import "./SubmitButton.css";

function SubmitButton({ title, isActive, errorMessage }) {

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
