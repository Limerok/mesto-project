import { profileName,profileDescription,popupEditProfile,popupAvatar,profileAvatar} from "./utils.js";
import { createPost } from "./card.js";
import { patchDataProfile, postCards,patchAvatar } from "./api.js";
import { myId } from "../index.js";

const formEditProfil = document.querySelector('#saved-profil'),
  inputNameSurname = document.querySelector('#name-surname'),
  inputAboutMe = document.querySelector('#about-me'),
  formAddPost = document.querySelector('#new-post'),
  inputPostName = document.querySelector('#post-name'),
  inputPostLink = document.querySelector('#post-link'),
  popupNewPost = document.querySelector('.popup_add-post'),
  formNewAvatar = document.querySelector('#new-avatar'),
  inputAvatar = document.querySelector('#avatar-link');

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
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopap(openPopup);
  } else {
    return
  }
}

//Получение данных профиля
function getModalProfil(name, about) {
  inputNameSurname.value = name.textContent.trim();
  inputAboutMe.value = about.textContent.trim();
}

//Обновление данных профиля на странице
function updateProfil(result) {
  profileName.textContent = result.name;
  profileDescription.textContent = result.about;
}
//Сохранение данных профиля на сервере
function saveProfil(event) {
  event.preventDefault();

  renderLoading(true, event.submitter);
  patchDataProfile(inputNameSurname.value.trim(),inputAboutMe.value.trim())
    .then((result) => {
      updateProfil(result);
      closePopap(popupEditProfile);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    })
}

//Событие сохранение данных профиля
formEditProfil.addEventListener('submit', saveProfil);

//Событие создание нового поста
formAddPost.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = inputPostName.value.trim(),
    img = inputPostLink.value.trim();
  
  renderLoading(true, event.submitter);
  postCards(name, img)
    .then((result) => {
      const img = result.link,
        name = result.name,
        likeCount = result.likes.length,
        usersId = result.owner._id,
        cardId = result._id;

      createPost(img, name, likeCount, myId, usersId, cardId);
      closePopap(popupNewPost);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    })
})

function updateAvatar(newAvatar) {
  profileAvatar.src = newAvatar;
}

//Событие сохранение аватарки
formNewAvatar.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatarUrl = inputAvatar.value.trim();

  renderLoading(true, event.submitter);
  patchAvatar(avatarUrl)
    .then((result) => {
      updateAvatar(result.avatar);
      closePopap(popupAvatar);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    })
})

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if(isLoading){
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
  
}

export { closePopap,getModalProfil,checkPopapClick,checkPopapKeydown,formAddPost,popupNewPost,updateProfil,formNewAvatar,updateAvatar,renderLoading,formEditProfil }