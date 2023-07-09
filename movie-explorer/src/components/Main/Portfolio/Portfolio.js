import React, { useState } from "react";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-wrapper">
          <h2 className="portfolio__subtitle">Статичный сайт</h2>
          <a target="_blank" href="https://alinalvova.github.io/how-to-learn/index.html" className="portfolio__link portfolio__subtitle link">↗</a>
        </li>
        <li className="portfolio__link-wrapper">
          <h2 className="portfolio__subtitle">Адаптивный сайт</h2>
          <a target="_blank" href="https://alinalvova.github.io/russian-travel/" className="portfolio__link portfolio__subtitle link">↗</a>
        </li>
        <li className="portfolio__link-wrapper">
          <h2 className="portfolio__subtitle">Одностраничное приложение</h2>
          <a target="_blank" href="https://malina.nomoredomains.rocks/sign-in" className="portfolio__link portfolio__subtitle link">↗</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
