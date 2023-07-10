import React, { useState } from 'react';

import './InputField.css';

function InputField({title, type, placeholder}) {
  return (
    <div className="input-field">
      <div className="input-field__title input-field__text">{title}</div>
      <input
        type={type}
        className="input-field__input"
        placeholder={placeholder}
        minLength="2"
        maxLength="30"
        required
      />
      <div className="input-field__error-message input-field__text">sdsdsd</div>
    </div>
  );
}

export default InputField;
