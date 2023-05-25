import React, { useState } from 'react';
import logoHead from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const headerClass = isVisible ? 'header__visible' : '';
  const infoClass = isVisible ? 'header__info_visible' : '';
  const burgerClass = isVisible ? 'burger_close' : '';

  return (
    <header className={`header ${headerClass}`}>
      <img src={logoHead} alt="Логотип Mesto Russia" className="header__logo"/>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className={`header__info ${infoClass}`}>
                <p className="header__email">{email}</p>
                <button
                  className="header__link header__button-logout"
                  onClick={onSignOut}
                  type="button"
                >
                  Выйти
                </button>
              </div>
              <button
                type="button"
                className={`burger ${burgerClass}`}
                onClick={toggleVisibility}
              >
                <span className="burger__line" />
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
