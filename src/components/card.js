import { openPopup } from "./utils.js";
import { deleteCards,putLike,deleteLike } from "./api.js";
import { myId } from "../index.js";

const templatePost = document.querySelector('#template-post').content,
  cardsContainer = document.querySelector('.posts__list'),
  popupZoomImage = document.querySelector('.popup_zoom-image'),
  imageZoom = document.querySelector('.popup__zoom-image'),
  descriptionZoom = document.querySelector('.popup__zoom-description');


function checkLikeArr(arrLike) {
  let like = false;
  arrLike.forEach((item) => {
    if (item._id === myId) {
      like = true;
    }
  })
  return like
}

function loadCardsStart(cards) {
  const cardReverse = cards.reverse();
  cardReverse.forEach((item) => {
    const img = item.link,
      name = item.name,
      like = item.likes,
      usersId = item.owner._id,
      cardId = item._id;

      createPost(img, name, like.length, myId, usersId, cardId, checkLikeArr(like));
  })
}

//добавление события :Лайк поста
function likePost(buttonLike, cardId, likeCount) {
  const likeResult = buttonLike.classList.contains('post__like_active');
  
  if(!likeResult) {
    putLike(cardId)
      .then((result) => {
        likeCount.textContent = result.likes.length;
        buttonLike.classList.toggle('post__like_active');
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      })
  } else {
    deleteLike(cardId)
      .then((result) => {
        likeCount.textContent = result.likes.length;
        buttonLike.classList.toggle('post__like_active');
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      })
  }
}

//добавление события :Удаление поста
function trashPost(trash) {
  const cardId = trash.getAttribute('data-card-Id');

  deleteCards(cardId)
    .then(() => {
      trash.closest('.post').remove();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
}

//добавление события :Открытие большого изображения
function openImage(image, name) {
  imageZoom.src = image.getAttribute('src');
  imageZoom.alt = name;
  descriptionZoom.textContent = name;
  
  openPopup(popupZoomImage);
}

//Генерация нового поста (перед добавлением)
function renderPost(img, name, likeCount, myId, usersId, cardId, chekLike) {
const clonePost = templatePost.querySelector('.post').cloneNode(true),
  buttonLike = clonePost.querySelector('.post__like'),
  imagePost = clonePost.querySelector('.post__image'),
  buttonTrash = clonePost.querySelector('.post__trash'),
  namePost = clonePost.querySelector('.post__name'),
  like = clonePost.querySelector('.post__like-count');

  if(chekLike) {
    buttonLike.classList.add('post__like_active')
  }

  if (myId == usersId) {
    buttonTrash.setAttribute('data-card-Id', cardId);

    buttonTrash.addEventListener('click', () => {
      trashPost(buttonTrash);
    })
  } else {
    buttonTrash.remove();
  }

  imagePost.src = img;
  imagePost.alt = name;
  namePost.textContent = name;
  like.textContent = likeCount;
  buttonLike.setAttribute('data-card-Id', cardId);

  buttonLike.addEventListener('click', () => {
    likePost(buttonLike, cardId, like);
  })
  imagePost.addEventListener('click', () => {
    openImage(imagePost, name);
  })

  return clonePost;
}

//Добавление Поста на страницу
function createPost(img, name, like, myId, usersId, cardId, chekLike=false) {
  const newPost = renderPost(img, name, like, myId, usersId, cardId, chekLike);

  cardsContainer.prepend(newPost);
}

export {createPost,loadCardsStart}