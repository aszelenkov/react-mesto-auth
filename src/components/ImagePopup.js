import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ name, isOpen, onClose, card }) {
  usePopupClose(card, onClose);
  
  return (
    <div 
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div className="popup__container-view" 
      >
        <button 
          className="popup__button-close popup__close" 
          type="button" 
          aria-label="Закрыть pop-up"
          onClick={onClose}
        >
        </button>
        <figure className="popup__figure">
          <img 
            className="popup__photo" 
            src={card?.link} 
            alt={card?.name}
          />
          <figcaption 
            className="popup__photo-caption"
          >
            {card?.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;