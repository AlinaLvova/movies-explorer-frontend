import "./Menu.css";
import "../../constant/common.css";
import "../HeaderCommon/HeaderCommon";
import usePopupClose from "../../../../hooks/usePopupClose";
import ProfileButton from '../ProfileButton/ProfileButton';

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Menu({isOpen, onClose}) {
  const handleCloseMenu = () => {

  };

  usePopupClose(isOpen, onClose);


  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <menu className={`menu ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <div className="menu__container">
            <button
              className="menu__close-button button-style link"
              onClick={onClose}
            />
            <div className="menu__content">
              <NavLink to="/" className={({ isActive }) =>`menu__link link ${isActive && 'underlined'}`}>
                Главная
              </NavLink>
              <NavLink to="/movies" className={({ isActive }) =>`menu__link link ${isActive && 'underlined'}`}>
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className={({ isActive }) =>`menu__link link ${isActive && 'underlined'}`}>
                Сохранённые фильмы
              </NavLink>
            </div>
            <div className="menu__account">
              <ProfileButton/>
            </div>
          </div>
        )}
      </menu>
    </div>
  );
}

export default Menu;
