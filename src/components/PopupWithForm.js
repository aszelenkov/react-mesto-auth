import React, { useRef } from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function PopupWithForm(props) {

  const formRef = useRef();

  const popupIsValid = props.isOpen 
    ? `popup popup_type_${props.name} popup_opened` 
    : `popup popup_type_${props.name}`;

  const buttonIsValid = `popup__button-save ${!props.isValid 
    ? 'popup__button-save_disabled' 
    : ''}`;

  usePopupClose(props.isOpen, props.onClose);

  return (
    <div
      className={popupIsValid}
    >
      <div 
        className='popup__container' 
      >
        <button
          className='popup__button-close popup__close'
          type='button'
          aria-label='Закрыть pop-up'
          onClick={props.onClose}
        >
        </button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
          ref={formRef}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}

          <button
            className={buttonIsValid}
            type='submit'
            disabled={!props.isValid}
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
