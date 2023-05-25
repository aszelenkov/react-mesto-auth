import PopupWithForm from "./PopupWithForm"; 
import { useEffect } from "react"; 
import { useFormAndValidation } from "../hooks/useFormAndValidation"; 

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) { 
  const {  
    values,  
    errors,  
    handleChange,  
    isValid,  
    resetForm  
  } = useFormAndValidation(); 
   
  function handleSubmit(evt) { 
    evt.preventDefault(); 
    onAddPlace({ 
      name: values.title, 
      link: values.url 
    }); 
  } 

  useEffect(() => { 
    if(isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]); 

  return ( 
    <PopupWithForm 
        title='Новое место' 
        name='item' 
        isOpen={isOpen} 
        onClose={onClose} 
        submitButtonText={isLoading ? "Сохранение..." : "Создать"}
        onSubmit={handleSubmit} 
        isValid={isValid} 
      > 
        <input 
          className='popup__input popup__input_item_title' 
          id='item-title' 
          name='title' 
          placeholder='Название' 
          type='text' 
          minLength='2' 
          maxLength='30' 
          required 
          value={values.title ?? ''} 
          onChange={handleChange} 
        /> 
        <span className='item-title-error popup__input-error popup__error'>{errors.title}</span> 

        <input 
          className='popup__input popup__input_item_url' 
          id='item-url' 
          name='url' 
          placeholder='Ссылка на картинку' 
          type='url' 
          required 
          value={values.url ?? ''} 
          onChange={handleChange} 
        /> 
        <span className='item-url-error popup__input-error popup__error'>{errors.url}</span> 
    </PopupWithForm> 
  ) 
} 

export default AddPlacePopup 
