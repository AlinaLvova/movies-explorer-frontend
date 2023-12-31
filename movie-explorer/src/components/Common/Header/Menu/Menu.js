import "./Menu.css";
import "../../constant/common.css";
import "../HeaderCommon/HeaderCommon";
import usePopupClose from "../../../../hooks/usePopupClose";
import ProfileButton from "../ProfileButton/ProfileButton";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Menu({ isOpen, onClose }) {
  const handleCloseMenu = () => {};

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <menu className={`menu ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <nav className="menu__container">
            <button type="button" className="menu__close-button link" onClick={onClose} />
            <ul className="menu__content">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `menu__link link ${isActive && "active"}`
                  }
                >
                  Главная
                </NavLink>
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `menu__link link ${isActive && "active"}`
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    `menu__link link ${isActive && "active"}`
                  }
                >
                  Сохранённые фильмы
                </NavLink>
            </ul>
            <div className="menu__account">
              <ProfileButton />
            </div>
          </nav>
        )}
      </menu>
    </div>
  );
}

export default Menu;
