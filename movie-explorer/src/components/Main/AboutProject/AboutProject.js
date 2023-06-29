import React, { useState } from "react";

import "./AboutProject.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";

function AboutProject() {
  return (
    <section id="AboutProject" className="about-project">
      <SectionHeader headerTitle={"О проекте"} />
      <ul className="about-project__table">
        <li className="about-project__container">
          <h4 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__container">
          <h4 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__timeline-container">
        <div className="about-project__week-container">
          <div className="about-project__timeline-bar about-project__timeline-bar_green">
            1 неделя
          </div>
          <div className="about-project__caption">Back-end</div>
        </div>
        <div className="about-project__week-container">
          <div className="about-project__timeline-bar about-project__timeline-bar_grey">
            4 недели
          </div>
          <div className="about-project__caption">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
