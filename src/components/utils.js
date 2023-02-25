import { checkPopapClick,checkPopapKeydown } from "./modal.js";

const profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  popupEditProfile = document.querySelector('.popup_edit-profile'),
  profileAvatar = document.querySelector('.profile__avatar'),
  popupAvatar = document.querySelector('.popup_add-avatar');

//Открытие Попап
function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', checkPopapClick);
  document.addEventListener('keydown', checkPopapKeydown);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
  

export {profileName,profileDescription,popupEditProfile,openPopup,profileAvatar,popupAvatar,checkResponse}