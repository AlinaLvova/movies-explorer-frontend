import { useState, React } from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/Header/Header";
import SubmitButton from "../../Auth/SubmitButton/SubmitButton";

import "./Profile.css";

function Profile({ name, email, onMenuButtonClick }) {
  const [updateButton, setUpdateButton] = useState(false);
  const errorMessage = "При обновлении профиля произошла ошибка.";

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="profile">
          <h1 className="profile__greetings">Привет, {name}!</h1>
          <form className="profile__data-container">
            <div className="profile__data-row">
              <label className="profile__label">Имя</label>
              <input value={name} type="text" className="profile__input" />
            </div>
            <div className="profile__data-row">
              <label className="profile__label">E-mail</label>
              <input value={email} type="email" className="profile__input" />
            </div>
          </form>
          {!updateButton && (
            <div className="profile__update-container">
              <button className="profile__update-btn link" type="button">
                Редактировать
              </button>
              <button className="profile__logout button-style link" type="button">
                Выйти из аккаунта
              </button>
            </div>
          )}
          {updateButton && (
            <div className="profile__update-container">
              <span className="profile__span-update">{errorMessage}</span>
              <SubmitButton title="Сохранить" inActive={false}/>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
