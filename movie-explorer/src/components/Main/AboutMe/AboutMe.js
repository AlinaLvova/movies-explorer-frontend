import React, { useState } from "react";
import imageOfMe from "../../../images/me1.jpg";
import "./AboutMe.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";

function AboutMe() {
  return (
    <div className="about-me">
      <SectionHeader headerTitle={"Студент"} />
      <div className="about-me__wrapper">
        <img
          src={imageOfMe}
          className="about-me__imageOfMe"
          alt="Мой портрерт."
        />
        <div className="about-me__info">
          <h1 className="about-me__title">Алина</h1>
          <h4 className="about-me__subtitle">Фронтенд-разработчик</h4>
          <p className="about-me__description">
            Я родилась под Нижним Новгородом, закончила Нижегородский
            государственный университет. Я люблю слушать аудиокниги, а ещё
            плавать и бегать на лыжах. Начинала программировать еще в школьные
            годы - начиная с Pascal и заканчивая C++ и Python. Моя первая работа
            была связана с контроллерами. Я решила сменить фокус в своей работе
            и начать углубляться в область разработки сайтов.
          </p>
          <a
            href="https://github.com/alinalvova"
            className="about-me__githubLink"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
