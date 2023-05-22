import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>

      <section className='profile'>
        <div 
          className='profile__avatar-block' 
          onClick={props.onEditAvatar}
        >
          <img 
            className='profile__avatar' 
            src={currentUser.avatar} 
            alt='Аватар профиля'
          />
        </div>

        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <p className='profile__about'>{currentUser.about}</p>
          <button 
            className='profile__button-edit' 
            type='button' 
            aria-label='Редактировать профиль'
            onClick={props.onEditProfile}
          >
          </button>
        </div>

        <button 
          className='profile__button-add-item' 
          type='button' 
          aria-label='Добавить новое место'
          onClick={props.onAddPlace}
          >
          </button>
      </section>

      <section 
        className='elements' 
        aria-label='Секция с карточками'
      >
        <ul className='elements__cards'
        >
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onClose={props.onClose}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;