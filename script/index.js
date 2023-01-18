const profileEdit = document.querySelector('.profile__edit'),
  postAdd = document.querySelector('.profile__add-post'),
  popupNewPost = document.querySelector('.popup_add-post'),
  popupEditProfile = document.querySelector('.popup_edit-profile'),
  popupCloseList = document.querySelectorAll('.popup__close'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  inputNameSurname = document.querySelector('#profil-name-surname'),
  inputAboutMe = document.querySelector('#profil-about-me'),
  formEditProfil = document.querySelector('#saved-profil'),
  templatePost = document.querySelector('#template-post').content,
  cardsContainer = document.querySelector('.posts__list'),
  formAddPost = document.querySelector('#new-post'),
  inputPostName = document.querySelector('#post-name'),
  inputPostLink = document.querySelector('#post-link'),
  popupZoomImage = document.querySelector('.popup_zoom-image'),
  imageZoom = document.querySelector('.popup__zoom-image'),
  descriptionZoom = document.querySelector('.popup__zoom-description');

//Открытие Попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Закрытие Попап
function closePopap(popup) {
  popup.classList.remove('popup_opened');
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

//Событие закрытие popup
popupCloseList.forEach((item) => {
  const popup = item.closest('.popup');
  
  item.addEventListener('click', () => {
    closePopap(popup);
  })
})

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

//Загрузка постов при старте страницы
initialCards.forEach((item) => {
  const img = item.link,
    name = item.name;

    createPost(img, name);
})