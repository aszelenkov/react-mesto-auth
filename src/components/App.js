import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

function App() {

  const [popups, setPopups] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isPhotoViewPopupOpen: false,
    isDeleteCardPopupOpen: false,
    isInfoTooltipPopupOpen: false,
  });

  const closeAllPopups = () => {
    setPopups({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isPhotoViewPopupOpen: false,
      isDeleteCardPopupOpen: false,
      isInfoTooltipPopupOpen: false,
    });
    setSelectedCard(null);
    setDeletedCard(null);
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePopupStateChange = (popup, state) => {
    setPopups({ ...popups, [popup]: state });
  };

  const handleError = (err) => console.log(`Ошибка: ${err}`);

  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getItems()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(handleError);
    }
  }, [loggedIn]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setPopups({ ...popups, isPhotoViewPopupOpen: true });
  };

  const handleDeleteCardClick = (card) => {
    setDeletedCard(card);
    setPopups({ ...popups, isDeleteCardPopupOpen: true });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(handleError);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(handleError) 
  };

  const handleUpdateAvatar = ({avatar}) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  };

  const handleUpdateUser = ({ name, about }) => {
    api
    .setUserInfo({ name: name, about: about })
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(handleError)
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .setItem({ name: name, link: link })
      .then((newCard) => {
        setCards((cards) => [newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError)
  }

  const handleConfirmRegister = (ok) => {
    setPopups({ ...popups, isInfoTooltipPopupOpen: true })
    setIsSuccess(ok)
    
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          handleConfirmRegister(true)
          navigate('./sign-in')
        } else {
          handleConfirmRegister(false);
        }
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
    .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const onSignOut = () => {
    setLoggedIn(false)
    setEmail('')
    navigate("/sign-in");
    localStorage.removeItem("token");
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res){
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          localStorage.removeItem("token");
        });
    }
  }, [navigate]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <Header 
        loggedIn={loggedIn}
        email={email}
        onSignOut={onSignOut}
      />

      <Routes>
        <Route 
          path="/sign-up" 
          element={<Register 
            onRegister={handleRegister} />} 
        />

        <Route 
          path="/sign-in" 
          element={<Login 
            onLogin={handleLogin} />} 
        />

        <Route 
          path="/"
          element={
            <ProtectedRoute
              element={Main} 
              onEditAvatar={() => handlePopupStateChange("isEditAvatarPopupOpen", true)}
              onEditProfile={() => handlePopupStateChange("isEditProfilePopupOpen", true)}
              onAddPlace={() => handlePopupStateChange("isAddPlacePopupOpen", true)}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              cards={cards}
              loggedIn={loggedIn} 
              onClose={closeAllPopups}          
            />
          }
        />
        <Route 
          path='*'
          element={<Navigate to="sign-in" /> }
        />
      </Routes>

      {loggedIn && <Footer />}

      {currentUser && (
      <>
      <EditAvatarPopup 
        onUpdateAvatar={handleUpdateAvatar} 
        isOpen={popups.isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
      />

      <EditProfilePopup 
        onUpdateUser={handleUpdateUser} 
        isOpen={popups.isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
      /> 

      <AddPlacePopup 
        onAddPlace={handleAddPlaceSubmit} 
        isOpen={popups.isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
      />

      <DeleteCardPopup 
        onDeleteCard={handleCardDelete} 
        isOpen={popups.isDeleteCardPopupOpen} 
        deletedCard={deletedCard}
        onClose={closeAllPopups}
      />
      </>
      )}

      <ImagePopup
        isOpen={popups.isPhotoViewPopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={popups.isInfoTooltipPopupOpen}
        isSuccess={isSuccess}
        onClose={closeAllPopups}
        successMessage="Вы успешно зарегистрировались!" 
        errorMessage="Что-то пошло не так! Попробуйте еще раз."
      />
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;