import { useState, React, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";
import Header from "../../Common/Header/Header";
import mainApi from "../../../utils/MainApi";
import { ERROR_MESSAGE_INVALID_EMAIL } from "../../../utils/constant";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import Preloader from "../../Preloader/Preloader";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Login(props) {
  const navigate = useNavigate();
  const { setLoggedIn } = props;
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const [isActiveInputField, setIsActiveInputField] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function handleSubmitRegister(event) {
    event.preventDefault();

    setIsActiveInputField(false);

    loginUser(dataForm);

    setIsActiveInputField(true);
  }

  function checkActivateSubmitButton() {
    // Check if any field value is empty
    const hasEmptyField = Object.values(dataForm).some((value) => value === "");
    // Check if any error message is not empty
    const hasError = Object.values(errorMessages).some(
      (message) => message !== ""
    );
    // Set the isActiveSubmitButton state accordingly
    setIsActiveSubmitButton(!hasEmptyField && !hasError);
  }

  function validateFormFields(formElement) {
    let errorMessage = "";

    if (formElement.id === "email") {
      // Проверка ввода email с помощью регулярного выражения
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formElement.value)) {
        errorMessage = ERROR_MESSAGE_INVALID_EMAIL;
      }
    } else {
      if (!formElement.validity.valid) {
        errorMessage = formElement.validationMessage.split(".")[0];
      }
    }

    setErrorMessages((messages) => ({
      ...messages,
      [formElement.id]: errorMessage,
    }));
  }

  function handleChangeLogin(event) {
    const formElement = event.target;

    setErrorResponseMessage("");

    setDataForm((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));

    validateFormFields(formElement);
  }

  useEffect(() => {
    checkActivateSubmitButton();
  }, [dataForm, errorMessages]);

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn, navigate]);

  function loginUser(dataForm) {
    setStatePreloader(true);

    mainApi
      .login({ email: dataForm.email, password: dataForm.password })
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        mainApi
          .getUserInfo(data.token)
          .then((userData) => {
            setCurrentUser({name: userData.name, email: userData.email});
          })
          .catch((err) => console.log(err.status, err.errorMessage));
        navigate("/movies");
      })
      .catch((err) => {
        setErrorResponseMessage(err.message);
        setIsActiveSubmitButton(false);
      })
      .finally(() => {
        setStatePreloader(false);
      });
  }

  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="login">
          <form
            action="#"
            className="login-form"
            onSubmit={handleSubmitRegister}
            //onChange={handleChangeRegister}
            noValidate
            method="POST"
          >
            <InputField
              id="email"
              title="E-mail"
              type="text"
              placeholder="E-mail"
              errorMessage={errorMessages.email}
              disabled={!isActiveInputField}
              value={dataForm.email || ""}
              onChange={handleChangeLogin}
            />
            <InputField
              id="password"
              title="Пароль"
              type="password"
              placeholder="Пароль"
              errorMessage={errorMessages.password}
              disabled={!isActiveInputField}
              value={dataForm.password || ""}
              onChange={handleChangeLogin}
              minLength="1"
            />
            {isActivePreloader && <Preloader />}
            <div className="login-form__button">
              <SubmitButton
                title={"Войти"}
                isActive={isActiveSubmitButton}
                errorMessage={errorResponseMessage}
              />
            </div>
          </form>
          <FormNav
            questionTitle={"Ещё не зарегистрированы?"}
            linkTitle={"Регистрация"}
            linkTo={"/signup"}
          />
        </section>
      </main>
    </div>
  );
}

export default Login;
