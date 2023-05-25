import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Register = (props) => {
  const { 
    values, 
    errors, 
    isValid, 
    handleChange, 
    setValues, 
    resetForm 
  } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values.email, values.password);
  }

  useEffect(() => {
    setValues({ 
      email: '',
      password: ''});
    resetForm();
  }, [setValues, resetForm]);

  return (
    <form 
      className="popup__form login__form" 
      onSubmit={handleSubmit} 
      noValidate>
      <h2 className="popup__title login__title">
        Регистрация
      </h2>
      <input
        className="popup__input login__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        minLength="2"
        maxLength="25"
        required
      />
      <span 
        className='email-input-error popup__input-error popup__error'>
          {errors.email}
      </span> 
      <input
        className="popup__input login__input"
        type="password"
        id="password-input"
        name="password"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        minLength="5"
        required
      />
      <span 
        className='password-input-error popup__input-error popup__error'>
          {errors.password}
      </span>
      <button 
        className="popup__button-save login__button" 
        type="submit" 
        disabled={!isValid}>
          Зарегистрироваться
      </button>
      <p className="login__text">
        <Link 
          className="login__text" 
          to="/sign-in">
            Уже зарегистрированы? Войти
        </Link>
      </p>
    </form>
  )
};

export default Register;
