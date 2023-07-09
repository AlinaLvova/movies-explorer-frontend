import { useState, React } from "react";

import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNav from "../FormNav/FormNav";
import "./Register.css";

function Register() {
  return (
    <section className="register">
      <form className="register-form">
        <InputField title={"Имя"} type={"text"} />
        <InputField title={"E-mail"} type={"text"} />
        <InputField title={"Пароль"} type={"password"} />
        <SubmitButton title={"Зарегистрироваться"} />
      </form>
      <FormNav
        questionTitle={"Уже зарегистрированы?"}
        linkTitle={"Войти"}
        linkTo={"/signin"}
      />
    </section>
  );
}

export default Register;
