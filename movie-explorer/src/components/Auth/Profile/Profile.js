import { useState, React } from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/Header/Header";

import "./Profile.css";

function Profile({ name, email, onMenuButtonClick }) {
  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="profile">
          <h2 className="profile__greetings">Привет, {name}!</h2>
          <div className="profile__data-container">
            <div className="profile__data-row">
              <p>Имя</p>
              <p>{name}</p>
            </div>
            <div className="profile__data-row">
              <p>E-mail</p>
              <p>{email}</p>
            </div>
          </div>
          <button className="profile__update-btn link">Редактировать</button>
          <Link to="/" className="profile__logout link">
            Выйти из аккаунта
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Profile;
