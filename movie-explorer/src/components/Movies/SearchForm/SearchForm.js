import React, { useState } from "react";

import "./SearchForm.css";

function SearchForm() {
  const [activeSwitcher, setActiveSwitcher] = useState(false);

  function handleSwitcherClick() {
    setActiveSwitcher(!activeSwitcher);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-form__search-icon"></div>
        <input
          className="search-form__input-field"
          type="text"
          placeholder="Фильм"
        ></input>
        <button className="search-form__search-btn link" type="button">
          Найти
        </button>
      </div>
      <div className="search-form__delimeter"></div>
      <div className="search-form__switcher-container">
        <button
          className={`search-form__switcher ${activeSwitcher ? "active" : ""}`}
          onClick={handleSwitcherClick}
        >
          <div className="search-form__switcher-ball"></div>
        </button>
        <div className="search-form__switcher-text">Короткометражка</div>
      </div>
    </section>
  );
}

export default SearchForm;
