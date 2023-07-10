import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderCommon from "./HeaderCommon/HeaderCommon.js";
import "./Header.css";
import "../constant/common.css";
import { MENU_ICON_SCREEN_WIDTH } from "../../../utils/constant.js";

function Header({ onClickMenuButton }) {
  const location = useLocation();
  const [headerColor, setHeaderColor] = useState(
    location.pathname === "/" ? "landing" : "main"
  );
  const [headerAuth, setHeaderAuth] = useState("");
  const [headerDisplay, setHeaderDisplay] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setHeaderColor(location.pathname === "/" ? "landing" : "main");
  }, [location.pathname]);

  useEffect(() => {
    setHeaderAuth(
      location.pathname === "/signup" || location.pathname === "/signin"
        ? "header__container-auth"
        : ""
    );
  }, [location.pathname]);

  useEffect(() => {
    setHeaderDisplay(
      location.pathname === "/404" ? "header-container__display_none" : ""
    );
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const handleOpenMenu = () => {
    onClickMenuButton();
  };

  return (
    <section
      className={`header-container header-container__color_${headerColor} ${headerDisplay}`}
    >
      <div className={`header ${headerAuth}`}>
        <a
          href="https://ya.ru/"
          target="_blank"
          aria-label="Логотип сайта с ссылкой на Яндекс."
          rel="noreferrer"
          className="header__logo link"
          alt="Логотип сайта с ссылкой на Яндекс."
        >
          {}
        </a>
        {location.pathname === "/" ? (
          <div className="header__auth">
            <Link to="/signup">
              <button className="button-style header__signup-button link">
                Регистрация
              </button>
            </Link>
            <Link to="/signin">
              <button className="button-style header__signin-button link">
                Войти
              </button>
            </Link>
          </div>
        ) : location.pathname === "/signin" ? (
          <div className="header__welcome-container">Рады видеть!</div>
        ) : location.pathname === "/signup" ? (
          <div className="header__welcome-container">Добро пожаловать!</div>
        ) : (
          <>
            {width < MENU_ICON_SCREEN_WIDTH ? (
              <button
                className="header__menu-button button-style link"
                onClick={handleOpenMenu}
              ></button>
            ) : (
              <HeaderCommon />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Header;
