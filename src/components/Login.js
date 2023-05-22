import React, { useState } from "react";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <h2 className="popup__title login__title">Вход</h2>
      <input
        className="popup__input login__input"
        type="email"
        name="login-email"
        placeholder="Email"
        value={email || ''}
        onChange={handleEmailChange}
        required
      />
      <input
        className="popup__input login__input"
        type="password"
        id="password-input"
        name="login-password"
        placeholder="Пароль"
        value={password || ''}
        onChange={handlePasswordChange}
        required
      />
      <button className="popup__button-save login__button" type="submit">Войти</button>
    </form>
  )
};

export default Login;