import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const location = useLocation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isAuth, setIsAuth] = useState(location.pathname === "/signin" || "/signup" || "/profile");

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60 * 24); // Обновляем год каждые 24 часа
    return () => clearInterval(interval);
    console.log(isAuth);
  }, []);

  return (
    <section className={`footer ${isAuth ? "hidden" : ""}`}>
      <h3 className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__text">&#169; {year}</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/"  target="_blank" className="footer__text link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/AlinaLvova"  target="_blank" className="footer__text link">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
