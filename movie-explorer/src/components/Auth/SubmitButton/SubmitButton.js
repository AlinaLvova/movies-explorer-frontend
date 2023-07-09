import React, { useState } from 'react';

import './SubmitButton.css';

function SubmitButton({title, onClick}) {
  const handleClick = () => {
    onclick();
  };

  return (
    <button onClick={handleClick} type='submit' className="submit-button link">{title}</button>
  );
}

export default SubmitButton;
