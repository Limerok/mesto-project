import './index.css';

import { enableValidation } from "./components/validate.js";
import { getDataProfil,formAddPost,popupNewPost } from "./components/modal.js";
import { profileName,profileDescription,popupEditProfile,openPopup } from "./components/utils.js";

const profileEdit = document.querySelector('.profile__edit'),
  postAdd = document.querySelector('.profile__add-post');
  
//Событие редактирование Профиля
profileEdit.addEventListener('click', () => {
  getDataProfil(profileName, profileDescription);
  openPopup(popupEditProfile);
})

//Событие добаление нового Поста
postAdd.addEventListener('click', () => {
  formAddPost.reset()
  openPopup(popupNewPost);
})

// Вызовем функцию валидации
enableValidation(
  {
    form: '.popup__form',
    input: '.popup__input-text',
    inputError: 'popup__input-text_error',
    messageError: 'popup__message-error_active',
    button: '.popup__button-submit',
    buttonDisabled: 'popup__button-submit_disabled',
  }
);