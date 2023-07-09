import { useState, React } from "react";

import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";

function Login() {
  return (
    <section className="login">
      <form className="login-form">
        <InputField title={"E-mail"} type={"text"} />
        <InputField title={"Пароль"} type={"password"} />
        <SubmitButton title={"Войти"} />
      </form>
      <FormNav
        questionTitle={"Ещё не зарегистрированы?"}
        linkTitle={"Регистрация"}
        linkTo={"/signup"}
      />
    </section>
  );
}

export default Login;
