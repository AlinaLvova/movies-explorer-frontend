import React, { useState, useEffect } from "react";

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
    <section className="footer">
      <h3 className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__text">&#169; {year}</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank" className="footer__text link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/AlinaLvova" rel="noreferrer" target="_blank" className="footer__text link">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
