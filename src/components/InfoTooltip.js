import React from 'react';
import successImg from '../images/success.svg';
import errorImg from '../images/error.svg';
import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, isSuccess, successMessage, errorMessage }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__infotooltip'>
        <button 
          className='popup__button-close popup__close' 
          type='button' 
          onClick={onClose} 
          aria-label='Закрыть pop-up'>
        </button>
        <img className='popup__status' 
          src={isSuccess ? successImg : errorImg} 
          alt={isSuccess ? 'Успешно' : 'Ошибка'} 
        />
        <h2 className='popup__title popup__text'>
          {isSuccess ? successMessage : errorMessage}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;