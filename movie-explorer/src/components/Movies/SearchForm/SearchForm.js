import React, { useState, useContext, useEffect } from "react";
import "./SearchForm.css";
import Switcher from "./Switcher/Switcher";
import { ERROR_MESSAGE_NOT_FOUND } from "../../../utils/constant";
import { SearchContext } from "../../../contexts/SearchContext";

function SearchForm({ onSearch, errorMessage, setErrorMessage }) {
  const [isCheckedSwitcher, setIsCheckedSwitcher] = useState(false);
  const [errorMessageNotFound, setErrorMessageNotFound] = useState('');
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  function handleCheckboxChange() {
    setIsCheckedSwitcher(!isCheckedSwitcher);
  }

  useEffect(() => {
    if (searchTerm !== ""){
      onSearch(isCheckedSwitcher);
    }
  }, [isCheckedSwitcher]);

  const handleChangeInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setErrorMessageNotFound("");
    setErrorMessage("");
    setSearchTerm(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setErrorMessageNotFound(searchTerm === '' ? ERROR_MESSAGE_NOT_FOUND : "");
    if (searchTerm !== ""){
      onSearch(isCheckedSwitcher);
    }
  };

  return (
    <section className="search-form">
      <form 
        className="search-form__search-container"
        onSubmit={handleSearch}
        noValidate
      >
        <div className="search-form__container">
          <div className="search-form__search-icon"></div>
          <input
            className="search-form__input-field"
            type="text"
            placeholder="Фильм"
            value={searchTerm}
            required
            onChange={handleChangeInput}
          ></input>
          <button
            type="submit"
            className="search-form__search-btn link"
          >
            Найти
          </button>
        </div>
        <div className="search-form__switcher-container">
          <Switcher
            onChecked={handleCheckboxChange}
            isChecked={isCheckedSwitcher}
          />
          <span className="search-form__switcher-text">Короткометражки</span>
        </div>
      </form>
      <span className="search-form__error-text">{errorMessage === "" ? errorMessageNotFound : errorMessage}</span>
    </section>
  );
}

export default SearchForm;
