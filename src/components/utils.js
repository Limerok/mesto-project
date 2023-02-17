import { checkPopapClick,checkPopapKeydown } from "./modal.js";

const profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  popupEditProfile = document.querySelector('.popup_edit-profile');

//Открытие Попап
function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', checkPopapClick);
  document.addEventListener('keydown', checkPopapKeydown);
}
  

export {profileName,profileDescription,popupEditProfile,openPopup}