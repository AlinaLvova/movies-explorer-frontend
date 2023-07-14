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
      <form className="search-form__search-container">
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
        <div className="search-form__switcher-container">
          <Switcher onChecked={handleCheckboxChange} isChecked={isChecked} />
          <span className="search-form__switcher-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
