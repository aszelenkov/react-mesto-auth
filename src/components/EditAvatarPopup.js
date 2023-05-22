import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const { 
    values, 
    errors, 
    isValid, 
    handleChange, 
    setValues, 
    resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: values.avatar
    });
  }

  useEffect(() => {
    setValues({ 
      avatar: '' });
  }, [props.isOpen, setValues, resetForm]);
 
  return (
    <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        submitButtonText='Сохранить'
        isValid={isValid}
      >
        <input
          className='popup__input popup__input_avatar_url'
          id='avatar-url'
          name='avatar'
          placeholder='Ссылка на картинку'
          type='url'
          ref={avatarRef}
          required
          value={values.avatar ?? ''}
          onChange={handleChange}
        />
        <span className='avatar-url-error popup__input-error popup__error'>{errors.avatar}</span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup