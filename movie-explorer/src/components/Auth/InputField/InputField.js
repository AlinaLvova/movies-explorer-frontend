import React, { useState } from 'react';

import './InputField.css';

function InputField({title, type}) {
  return (
    <div className="input-field">
      <div className="input-field__title input-field__text">{title}</div>
      <input type={type} className="input-field__input" />
      <div className="input-field__error-message input-field__text">sdsdsd</div>
    </div>
  );
}

export default InputField;
