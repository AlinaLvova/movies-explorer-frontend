import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageOfMe from "../../../images/me1.jpg";
import "./AboutMe.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <div  id="AboutMe" className="about-me">
      <SectionHeader headerTitle={"Студент"} />
      <div className="about-me__wrapper">
        <img
          src={imageOfMe}
          className="about-me__image-of-me"
          alt="Мой портрерт."
        />
        <div className="about-me__info">
          <h3 className="about-me__title">Алина</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик</p>
          <p className="about-me__description">
            Я родилась под Нижним Новгородом, закончила Нижегородский
            государственный университет. Я люблю слушать аудиокниги, а ещё
            плавать и бегать на лыжах. Начинала программировать еще в школьные
            годы - начиная с Pascal и заканчивая C++ и Python. Моя первая работа
            была связана с контроллерами. Я решила сменить фокус в своей работе
            и начать углубляться в область разработки сайтов.
          </p>
          <Link 
            to={"https://github.com/alinalvova"}
            className="about-me__github-link link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </Link>
        </div>
      </div>
      <Portfolio />
    </div>
  );
}

export default AboutMe;
