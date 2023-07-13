import { useState, React } from "react";

import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";
import Header from "../../Common/Header/Header";

function Login() {
  return (
    <div className="page__container auth">
      <Header />
      <main className="content auth">
        <section className="login">
          <form className="login-form">
            <InputField title={"E-mail"} type={"email"} placeholder={"E-mail"}/>
            <InputField title={"Пароль"} type={"password"} placeholder={"Пароль"}/>
            <div className="login-form__button">
              <SubmitButton title={"Войти"} />
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
