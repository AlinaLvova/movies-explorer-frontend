import React, { useState } from "react";

import "./SearchForm.css";
import Switcher from "./Switcher/Switcher";

function SearchForm() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange({ value }) {
    setIsChecked(value);
  }

  return (
    <section className="search-form">
      <div className="search-form__search-container">
      <div className="search-form__container">
          <div className="search-form__search-icon"></div>
          <input
            className="search-form__input-field"
            type="text"
            placeholder="Фильм"
            required
          ></input>
          <button type="submit" className="search-form__search-btn link">
            Найти
          </button>
        </div>
      </div>
      {/* <div className="search-form__delimeter"></div> */}
      <div className="search-form__switcher-container">
        <Switcher onChecked={handleCheckboxChange} isChecked={isChecked} />
        <h4 className="search-form__switcher-text">Короткометражки</h4>
      </div>
    </section>
  );
}

export default SearchForm;
