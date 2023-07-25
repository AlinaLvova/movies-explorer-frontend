import { useState, React, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";
import Header from "../../Common/Header/Header";
import mainApi from "../../../utils/MainApi";
import { ERROR_MESSAGE_INVALID_EMAIL } from "../../../utils/constant";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import Preloader from "../../Preloader/Preloader";

function Register(props) {
  const navigate = useNavigate();
  const { setLoggedIn, setCurrentUser } = props;
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isActiveInputField, setIsActiveInputField] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);

  function handleSubmitRegister(event) {
    event.preventDefault();

    setIsActiveInputField(false);

    registerUser(dataForm);

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

  function handleChangeRegister(event) {
    const formElement = event.target;

    setErrorResponseMessage("");

    setDataForm((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));

    validateFormFields(formElement);
  }

  // useEffect((() => {setStatePreloader(true)}),[]);

  function registerUser(dataForm) {
    setStatePreloader(true);

    mainApi
      .register(dataForm)
      .then((data) => {
        mainApi
          .login({ email: dataForm.email, password: dataForm.password })
          .then((data) => {
            setLoggedIn(true);
            localStorage.setItem("token", data.token);
            mainApi
              .getUserInfo(data.token)
              .then((userData) => {
                setCurrentUser(userData);
              })
              .catch((err) => console.log(err.status, err.errorMessage));
              navigate('/movies');
          })
          .catch((err) => {
            console.log(err.status, err.errorMessage);
          });
      })
      .catch((err) => {
        if (err.status === 409 && err.message === 'Пользователь с таким email уже зарегистрирован'){
          // setErrorMessages((messages) => ({
          //   ...messages,
          //   ["email"]: err.message,
          // }));
          setErrorResponseMessage(err.message);
        }
        else{
          // console.log(err.status, err.errorMessage);
          setErrorResponseMessage(err.message);
        }
      })
      .finally(() => {
        setStatePreloader(false);
      });
  }

  useEffect(() => {
    checkActivateSubmitButton();
  }, [dataForm, errorMessages]);

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn, navigate]);

  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="register">
          <form
            action="#"
            className="register-form"
            onSubmit={handleSubmitRegister}
            //onChange={handleChangeRegister}
            noValidate
            method="POST"
          >
            <InputField
              id="name"
              title="Имя"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              errorMessage={errorMessages.name}
              disabled={!isActiveInputField}
              value={dataForm.name || ""}
              onChange={handleChangeRegister}
            />
            <InputField
              id="email"
              title="E-mail"
              type="text"
              placeholder="E-mail"
              errorMessage={errorMessages.email}
              disabled={!isActiveInputField}
              value={dataForm.email || ""}
              onChange={handleChangeRegister}
            />
            <InputField
              id="password"
              title="Пароль"
              type="password"
              placeholder="Пароль"
              errorMessage={errorMessages.password}
              disabled={!isActiveInputField}
              value={dataForm.password || ""}
              onChange={handleChangeRegister}
              minLength="1"
            />
            {isActivePreloader && <Preloader/>}
            <div className="register-form__button">
              <SubmitButton
                title={"Зарегистрироваться"}
                isActive={isActiveSubmitButton}
                errorMessage={errorResponseMessage}
              />
            </div>
          </form>
          <FormNav
            questionTitle={"Уже зарегистрированы?"}
            linkTitle={"Войти"}
            linkTo={"/signin"}
          />
        </section>
      </main>
    </div>
  );
}

export default Register;
