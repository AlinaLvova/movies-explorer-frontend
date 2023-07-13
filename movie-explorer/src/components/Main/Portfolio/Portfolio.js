import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-wrapper">
          <Link target="_blank" rel="noreferrer" to={"https://alinalvova.github.io/how-to-learn/index.html"} className="portfolio__link portfolio__subtitle link">Статичный сайт</Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link target="_blank" rel="noreferrer" to={"https://alinalvova.github.io/russian-travel/"} className="portfolio__link portfolio__subtitle link">Адаптивный сайт</Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link target="_blank" rel="noreferrer" to={"https://malina.nomoredomains.rocks/sign-in"} className="portfolio__link portfolio__subtitle link">Одностраничное приложение</Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
