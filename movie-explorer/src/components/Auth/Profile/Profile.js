import { useState, React, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Common/Header/Header";
import SubmitButton from "../../Auth/SubmitButton/SubmitButton";
import Preloader from "../../Preloader/Preloader";

import { ERROR_MESSAGE_INVALID_EMAIL, SUCCESS_MESSAGE_UPDATE_PROFILE } from "../../../utils/constant";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

import mainApi from "../../../utils/MainApi";

import "./Profile.css";

function Profile({ onMenuButtonClick, setLoggedIn }) {
  const navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [updatedUserData, setUpdatedUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const [isDisabledInputField, setIsDisabledInputField] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);

  const handleUpdateButtonClick = () => {
    setShowSubmitButton(true);
    setShowUpdateButton(false);
    setIsDisabledInputField(false);
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
    if(!isEmailValid){
      setErrorMessage(ERROR_MESSAGE_INVALID_EMAIL);
    }

    const hasDataChanged = (nameInput.value !== currentUser.name || emailInput.value !== currentUser.email);

    // Если оба поля валидны, активируем кнопку
    setIsActiveSubmitButton(isNameValid && isEmailValid && hasDataChanged);
  }

  function handleLogoutButtonClick() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  function updateProfile(updatedUserData){
    setIsActiveSubmitButton(false);

    setStatePreloader(true);
    mainApi
      .updateUserInfo({
        name: updatedUserData.name,
        email: updatedUserData.email,
      })
      .then((response) => {
        setCurrentUser({name: response.name, email: response.email});
        setShowSubmitButton(false);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        if (error.status === 409){
          setIsDisabledInputField(false);
        }
        setIsActiveSubmitButton(false);
      })
      .finally(() => {
        setStatePreloader(false);
      });
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timerId = setTimeout(() => {
        setShowSuccessMessage(false);
        setIsDisabledInputField(true);
        setShowUpdateButton(true);
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [showSuccessMessage]);

  function handleSubmitUpdateProfile(event) {
    event.preventDefault();

    setIsDisabledInputField(true);

    updateProfile(updatedUserData);
  }

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="profile">
          <h1 className="profile__greetings">Привет, {currentUser.name}!</h1>
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
            {isActivePreloader && <Preloader />}
            {showSubmitButton && (
              <div className="profile__update-container">
                <span className="profile__span-update">{errorMessage}</span>
                <SubmitButton
                  title="Сохранить"
                  isActive={isActiveSubmitButton}
                  //onClick={handleUpdateButtonClick}
                />
              </div>
            )}
            {showSuccessMessage && (
              <div className="profile__update-container">
                <span className={`profile__success-message`}>
                  {SUCCESS_MESSAGE_UPDATE_PROFILE}
                </span>
              </div>
            )}
          </form>
          {showUpdateButton && (
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
