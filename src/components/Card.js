import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}` 
  );

  return (
    <li className="elements__item">
      <img
        className="elements__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className="elements__title">{card.name}</h2>
      <div className="elements__like-block">
        <button 
          className={cardLikeButtonClassName}
          type="button"
          aria-label='Нравится'
          onClick={handleLikeClick}
        >
        </button>
        <p className="elements__like-counter">{card.likes.length}</p>
      </div>
      {isOwn && 
      <button 
        className="elements__trash" 
        type="button"
        aria-label='Удалить карточку'
        onClick={handleDeleteClick}
      >
      </button>}
    </li>
  );
}

export default Card;
