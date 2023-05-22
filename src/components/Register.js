import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <h2 className="popup__title login__title">Регистрация</h2>
      <input
        className="popup__input login__input"
        type="email"
        name="register-email"
        placeholder="Email"
        value={email || ""}
        onChange={handleEmailChange}
        required
      />
      <input
        className="popup__input login__input"
        type="password"
        name="register-password"
        placeholder="Пароль"
        value={password || ""}
        onChange={handlePasswordChange}
        required
      />
      <button className="popup__button-save login__button" type="submit">Зарегистрироваться</button>
      <p className="login__text">
        <Link className="login__text" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </p>
    </form>
  )
};

export default Register;