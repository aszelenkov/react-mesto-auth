import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onDeleteCard(props.deletedCard);
  }

  return (
    <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        submitButtonText={props.isLoading ? "Удаление..." : "Да"}
        isValid={true}
    />
  )  
}

export default DeleteCardPopup