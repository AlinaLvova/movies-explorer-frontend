import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60 * 24); // Обновляем год каждые 24 часа
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <p className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__text">&#169; {year}</p>
        <ul className="footer__links">
          <li>
            <Link
              to={"https://practicum.yandex.ru/"}
              className="footer__link"
              rel="noreferrer"
              target="_blank"
              className="footer__text link"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li>
            <Link
              to={"https://github.com/AlinaLvova"}
              className="footer__link"
              rel="noreferrer"
              target="_blank"
              className="footer__text link"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
