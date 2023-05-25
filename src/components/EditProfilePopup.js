import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { 
    values, 
    errors, 
    handleChange, 
    isValid, 
    setValues, 
    resetForm 
  } = useFormAndValidation();

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
    }, [props.isOpen, setValues, resetForm, currentUser.name, currentUser.about]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  return (
    <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={props.isOpen}
        onClose={props.onClose}
        submitButtonText={props.isLoading ? "Сохранение..." : "Сохранить"}
        onSubmit={handleSubmit}
        isValid={isValid}
        
      >
        <input
          className='popup__input popup__input_profile_name'
          id='name-input'
          name='name'
          placeholder='Имя'
          type='text'
          minLength='2'
          maxLength='40'
          required
          value={values.name ?? ''}
          onChange={handleChange}
        />
        <span className='name-input-error popup__input-error popup__error'>
          {errors.name}
        </span>

        <input
          className='popup__input popup__input_profile_about'
          id='about-input'
          name='about'
          placeholder='О себе'
          type='text'
          minLength='2'
          maxLength='200'
          required
          value={values.about ?? ''}
          onChange={handleChange}
        />
        <span className='about-input-error popup__input-error popup__error'>
          {errors.about}
        </span>
      </PopupWithForm>
  )  
}

export default EditProfilePopup