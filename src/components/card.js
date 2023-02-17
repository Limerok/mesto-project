import { openPopup } from "./utils.js";

const templatePost = document.querySelector('#template-post').content,
  cardsContainer = document.querySelector('.posts__list'),
  popupZoomImage = document.querySelector('.popup_zoom-image'),
  imageZoom = document.querySelector('.popup__zoom-image'),
  descriptionZoom = document.querySelector('.popup__zoom-description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//Загрузка постов при старте страницы
initialCards.forEach((item) => {
  const img = item.link,
    name = item.name;

    createPost(img, name);
})

//добавление события :Лайк поста
function likePost(like) {
  like.classList.toggle('post__like_active');
}

//добавление события :Удаление поста
function trashPost(trash) {
  trash.closest('.post').remove();
}

//добавление события :Открытие большого изображения
function openImage(image, name) {
  imageZoom.src = image.getAttribute('src');
  imageZoom.alt = name;
  descriptionZoom.textContent = name;
  openPopup(popupZoomImage);
}

//Генерация нового поста (перед добавлением)
function renderPost(img, name) {
const clonePost = templatePost.querySelector('.post').cloneNode(true),
  buttonLike = clonePost.querySelector('.post__like'),
  buttonTrash = clonePost.querySelector('.post__trash'),
  imagePost = clonePost.querySelector('.post__image'),
  namePost = clonePost.querySelector('.post__name');

  imagePost.src = img;
  imagePost.alt = name;
  namePost.textContent = name;

  buttonLike.addEventListener('click', () => {
    likePost(buttonLike);
  })
  buttonTrash.addEventListener('click', () => {
    trashPost(buttonTrash);
  })
  imagePost.addEventListener('click', () => {
    openImage(imagePost, name);
  })

  return clonePost;
}

//Добавление Поста на страницу
function createPost(img, name) {
  const newPost = renderPost(img, name);

  cardsContainer.prepend(newPost);
}

export {createPost}