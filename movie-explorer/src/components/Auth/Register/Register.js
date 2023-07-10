import { useState, React } from "react";

import "./Register.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";
import Header from "../../Common/Header/Header";

function Register() {
  return (
    <div className="page__container auth">
      <Header />
      <main className="content auth">
        <section className="register">
          <form className="register-form">
            <InputField title={"Имя"} type={"text"} />
            <InputField title={"E-mail"} type={"text"} />
            <InputField title={"Пароль"} type={"password"} />
            <div className="register-form__button">
              <SubmitButton title={"Зарегистрироваться"} />
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
