import { useState, React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Common/Header/Header";
import SubmitButton from "../../Auth/SubmitButton/SubmitButton";
import mainApi from "../../../utils/MainApi";

import "./Profile.css";

function Profile({ name, email, onMenuButtonClick, setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [updatedUserData, setUpdatedUserData] = useState({
    name: name,
    email: email,
  });

  const [updateButton, setUpdateButton] = useState(false);
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const [isDisabledInputField, setisDisabledInputField] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateButtonClick = () => {
    setUpdateButton(true);
    setisDisabledInputField(false);
  };

  const handleChangeInputData = (event) => {
    const formElement = event.target;

    setUpdatedUserData((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));

    checkActivateSubmitButton(formElement.form);
  };

  function checkActivateSubmitButton(dataForm) {
    setErrorMessage("");

    const nameInput = dataForm.querySelector("#name");
    const emailInput = dataForm.querySelector("#email");

    // Проверяем валидность каждого поля
    const isNameValid = nameInput.checkValidity();
    if(!isNameValid){
      setErrorMessage(nameInput.validationMessage.split(".")[0]);
    }

    const isEmailValid = emailRegex.test(emailInput.value);
    console.log(isEmailValid);
    if(!isEmailValid){
      setErrorMessage("Пожалуйста, укажите корректный email в формате 'xxx@xx.xx', где xxx может содержать буквы, цифры, а также символы подчеркивания, тире и точки, а xx представляет доменное имя, состоящее из двух или трех букв, например, com, net, org, co.uk и т.д");
    }

    // Если оба поля валидны, активируем кнопку
    setIsActiveSubmitButton(isNameValid && isEmailValid);
  }

  function handleLogoutButtonClick() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  }

  function updateProfile(updatedUserData){
    setIsActiveSubmitButton(false);

    mainApi
      .updateUserInfo({
        name: updatedUserData.name,
        email: updatedUserData.email,
      })
      .then((response) => {
        setCurrentUser({name: response.name, email: response.email});
        setUpdateButton(false);
      })
      .catch((error) => console.log(error.message));
  }

  function handleSubmitUpdateProfile(event) {
    event.preventDefault();

    setisDisabledInputField(true);

    updateProfile(updatedUserData);
  }

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="profile">
          <h1 className="profile__greetings">Привет, {name}!</h1>
          <form 
            className="profile__data-container"
            action="#"
            onSubmit={handleSubmitUpdateProfile}
            noValidate
            method="POST"
          >
            <div className="profile__data-row">
              <label className="profile__label">Имя</label>
              <input
                id="name"
                value={updatedUserData.name}
                type="text"
                className="profile__input"
                onChange={handleChangeInputData}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
                disabled={isDisabledInputField}
              />
            </div>
            <div className="profile__data-row">
              <label className="profile__label">E-mail</label>
              <input
                id="email"
                value={updatedUserData.email}
                type="email"
                className="profile__input"
                onChange={handleChangeInputData}
                placeholder="Email"
                required
                disabled={isDisabledInputField}
              />
            </div>
            {updateButton && (
              <div className="profile__update-container">
                <span className="profile__span-update">{errorMessage}</span>
                <SubmitButton
                  title="Сохранить"
                  isActive={isActiveSubmitButton}
                  //onClick={handleUpdateButtonClick}
                />
              </div>
            )}
          </form>
          {!updateButton && (
            <div className="profile__update-container">
              <button
                className="profile__update-btn link"
                type="button"
                onClick={handleUpdateButtonClick}
              >
                Редактировать
              </button>
              <button
                className="profile__logout button-style link"
                type="button"
                onClick={handleLogoutButtonClick}
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
