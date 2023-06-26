import React, { useState } from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__title">О проекте</div>
      <ul className="about-project__table">
        <li class="about-project__container">
          <div className="about-project__subtitle">Дипломный проект включал 5 этапов</div>
          <div className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
        </li>
        <li className="about-project__container">
          <div className="about-project__subtitle">На выполнение диплома ушло 5 недель</div>
          <div className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
        </li>
      </ul>
      <div className="about-project__timeline-container">
        <div className="about-project__week-container">
          <div className="about-project__timeline-bar about-project__timeline-bar_green">1 неделя</div>
          <div class="about-project__caption">Back-end</div>
        </div>
        <div className="about-project__week-container">
          <div className="about-project__timeline-bar about-project__timeline-bar_grey">4 недели</div>
          <div className="about-project__caption">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
