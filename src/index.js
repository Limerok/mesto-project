import './index.css';

import { getCards,getDataProfile,getAvatar } from './components/api.js';
import { enableValidation } from "./components/validate.js";
import { getModalProfil,formAddPost,popupNewPost,formNewAvatar } from "./components/modal.js";
import { profileName,profileDescription,popupEditProfile,openPopup,popupAvatar } from "./components/utils.js";

const profileEdit = document.querySelector('.profile__edit'),
  postAdd = document.querySelector('.profile__add-post'),
  profileAvatarButton = document.querySelector('.profile__add-avatar');

//Событие добавление Аватарки
profileAvatarButton.addEventListener('click', () => {
  formNewAvatar.reset();
  openPopup(popupAvatar);
})

//Событие редактирование Профиля
profileEdit.addEventListener('click', () => {
  getModalProfil(profileName, profileDescription);
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

getDataProfile()
getCards()