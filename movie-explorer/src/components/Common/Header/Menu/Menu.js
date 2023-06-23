import "./Menu.css";
import "../../constant/common.css";
import "../HeaderCommon/HeaderCommon";
import usePopupClose from "../../../../hooks/usePopupClose";
import ProfileButton from '../ProfileButton/ProfileButton';

import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function Menu({isOpen, onClose}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [showOpenButton, setShowOpenButton] = useState(true);

  const handleCloseMenu = () => {

  };

  usePopupClose(isOpen, onClose);


  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      {/* <div className={`popup popup_opened}`}> */}
      {/* <menu className={`menu open`}> */}
      <menu className={`menu ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <div className="menu__container">
            <button
              className="menu__close-button button-style link"
              onClick={onClose}
            />
            <div className="menu__content">
              <Link to="/" className="menu__link link">
                Главная
              </Link>
              <Link to="/movies" className="menu__link link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="menu__link link">
                Сохранённые фильмы
              </Link>
            </div>
            <div className="menu__acсount">
              <ProfileButton/>
            </div>
          </div>
        )}
      </menu>
    </div>
  );
}

export default Menu;
