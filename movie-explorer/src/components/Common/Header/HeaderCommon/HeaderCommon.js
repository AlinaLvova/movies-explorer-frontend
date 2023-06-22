import './HeaderCommon.css';
import '../../constant/common.css';
import { Link } from 'react-router-dom';
import { useState, React } from "react";

function HeaderCommon() {
  return (
    <div className="header__buttons-container">
      <div className="header__movies-container">
        <Link to="/movies">
          <button className="header__movies button-style link">Фильмы</button>
        </Link>
        <Link to="/saved-movies">
          <button className="header__saved-movies button-style link">
            Сохранённые фильмы
          </button>
        </Link>
      </div>
      <div className="header__account-container button-style">
        <Link to="/profile" className="header__account-text link">
          Аккаунт
        </Link>
        <div className="header__account-logo"></div>
      </div>
    </div>
  );
}

export default HeaderCommon;
