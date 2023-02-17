import { profileName,profileDescription,popupEditProfile} from "./utils.js";
import { createPost } from "./card.js";

const formEditProfil = document.querySelector('#saved-profil'),
  inputNameSurname = document.querySelector('#name-surname'),
  inputAboutMe = document.querySelector('#about-me'),
  formAddPost = document.querySelector('#new-post'),
  inputPostName = document.querySelector('#post-name'),
  inputPostLink = document.querySelector('#post-link'),
  popupNewPost = document.querySelector('.popup_add-post');


//Закрытие Попап
function closePopap(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', checkPopapClick);
  document.removeEventListener('keydown', checkPopapKeydown);
}

//Проверка закрытия на оверлей и крестик
function checkPopapClick (event) {
  const parentTarget = event.currentTarget;
  const target = event.target;

  if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
    closePopap(parentTarget);
  } else {
    return
  }
}
//Проверка закрытия по клавише ESC
function checkPopapKeydown (event) {
  const openPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopap(openPopup);
  } else {
    return
  }
}

//Получение данных профиля
function getDataProfil(name, about) {
  inputNameSurname.value = name.textContent.trim();
  inputAboutMe.value = about.textContent.trim();
}
//Сохранение данных профиля
function saveProfil(event) {
  event.preventDefault();

  profileName.textContent = inputNameSurname.value.trim();
  profileDescription.textContent = inputAboutMe.value.trim();
  closePopap(popupEditProfile);
}

//Событие сохранение данных профиля
formEditProfil.addEventListener('submit', saveProfil);

//Событие создание нового поста
formAddPost.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = inputPostName.value.trim(),
    img = inputPostLink.value.trim();
  
  createPost(img, name);
  closePopap(popupNewPost);
})

export { closePopap,getDataProfil,checkPopapClick,checkPopapKeydown,formAddPost,popupNewPost }