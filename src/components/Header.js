import logoHead from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img 
        className="header__logo"
        src={logoHead} 
        alt='Логотип Mesto Russia' 
      />
      <div className='header__info'>
        <p className='header__email'>{email}</p>
        <Routes>
          <Route path="/sign-in" element={<Link className='header__link' to="/sign-up">Регистрация</Link>}></Route>
          <Route path="/sign-up" element={<Link className='header__link' to="/sign-in">Войти</Link>}></Route>
          <Route path="/" element={<Link className='header__link header__button-logout' onClick={onSignOut} to="/sign-in">Выйти</Link>}></Route>
        </Routes>
      </div>
    </header>
  )
}
export default Header
      


