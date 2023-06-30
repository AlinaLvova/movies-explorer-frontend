import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HeaderCommon from "./HeaderCommon/HeaderCommon.js";
import Menu from "./Menu/Menu.js";
import "./Header.css";
import "../constant/common.css";
import { MENU_ICON_SCREEN_WIDTH } from "../../../utils/constant.js"

function Header(props) {
  const paths = ["/movies", "/saved-movies", "/profile"];
  const location = useLocation();
  const [headerColor, setHeaderColor] = useState(
    location.pathname === "/" ? "landing" : "main"
  );
  // const [headerPhrase, setHeaderPhrase] = useState(
  //   location.pathname === "/signup" ? "Добро пожаловать!" : "Рады видеть!"
  // );
  const [headerAuth, setHeaderAuth] = useState("");
  const [headerDisplay, setHeaderDisplay] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  // Обработчик изменения роута
  useEffect(() => {
    setHeaderColor(location.pathname === "/" ? "landing" : "main");
  }, [location.pathname]);

  // Обработчик изменения роута для авторизации
  useEffect(() => {
    setHeaderAuth(
      location.pathname === "/signup" || location.pathname === "/signin"
        ? "header__container-auth"
        : ""
    );
  }, [location.pathname]);

  useEffect(() => {
    setHeaderDisplay(
      location.pathname === "/404"
        ? "header-container__display_none"
        : ""
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
    props.onClickMenuButton();
  };

  return (
    <section
      className={`header-container header-container__color_${headerColor} ${headerDisplay}`}
    >
      <div className={`header ${headerAuth}`}>
        <a href="https://ya.ru/" className="header__logo link" alt="Логотип сайта с ссылкой на Яндекс." />
        <Routes>
          <Route
            exact
            path="/"
            element={
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
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <div className="header__welcome-container">Рады видеть!</div>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <div className="header__welcome-container">Добро пожаловать!</div>
            }
          />
          {paths.map((path) => (
            <Route
              key={path}
              path={path}
              element={
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
              }
            />
          ))}
          <Route exact path="/404" />
        </Routes>
      </div>
    </section>
  );
}

export default Header;
