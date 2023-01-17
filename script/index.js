const profileEdit = document.querySelector('.profile__edit'),
  postAdd = document.querySelector('.profile__add-post'),
  popupNewPost = document.querySelector('.popup_add-post'),
  popupEditProfile = document.querySelector('.popup_edit-profile'),
  popupCloseList = document.querySelectorAll('.popup__close'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  inputNameSurname = document.querySelector('#profil-name-surname'),
  inputAboutMe = document.querySelector('#profil-about-me'),
  buttonSaveProfil = document.querySelector('#saved-profil'),
  templatePost = document.querySelector('#template-post').content,
  cardsContainer = document.querySelector('.posts__list'),
  buttonAddPost = document.querySelector('#new-post'),
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
function gettingDataProfil(name, about) {
  inputNameSurname.value = name.textContent.trim();
  inputAboutMe.value = about.textContent.trim();
}

//Сброс значений формы
function resetForm(popup) {
  const form = popup.querySelector('form');
  form.reset();
}

//Сохранение данных профиля
function savedProfil(event) {
  event.preventDefault();
  const target = event.target;

  profileName.textContent = inputNameSurname.value.trim();
  profileDescription.textContent = inputAboutMe.value.trim();
  closePopap(target.closest('.popup'))
}

//добавление события :Лайк поста
function likePost(like) {
  like.addEventListener('click', () => {
    like.classList.toggle('post__like_active');
  })
}

//добавление события :Удаление поста
function trashPost(trash) {
  trash.addEventListener('click', () => {
    trash.closest('.post').remove();
  })
}

//добавление события :Открытие большого изображения
function openImage(image, name) {
  image.addEventListener('click', () => {
    popupZoomImage.classList.add('popup_opened');
    imageZoom.src = image.getAttribute('src');
    descriptionZoom.textContent = name;
    console.log(image)
  })
}

//Генерация нового поста (перед добавлением)
function renderPost(img, name) {
  const clonePost = templatePost.querySelector('.post').cloneNode(true),
    buttonLike = clonePost.querySelector('.post__like'),
    buttonTrash = clonePost.querySelector('.post__trash'),
    imagePost = clonePost.querySelector('.post__image');

  clonePost.querySelector('.post__image').src = img;
  clonePost.querySelector('.post__name').textContent = name;

  likePost(buttonLike);
  trashPost(buttonTrash);
  openImage(imagePost, name);

  return clonePost;
}

//Добавление Поста на страницу
function createPost(img, name) {
  const newPost = renderPost(img, name);
  
  cardsContainer.prepend(newPost);
}

//Событие закрытие popup
popupCloseList.forEach((item) => {
  item.addEventListener('click', () => {
    closePopap(item.closest('.popup'));
  })
})

//Событие редактирование Профиля
profileEdit.addEventListener('click', () => {
  gettingDataProfil(profileName, profileDescription);
  openPopup(popupEditProfile);
})

//Событие добаление нового Поста
postAdd.addEventListener('click', () => {
  resetForm(popupNewPost);
  openPopup(popupNewPost);
})

//Событие сохранение данных профиля
buttonSaveProfil.addEventListener('submit', savedProfil);

//Событие создание нового поста
buttonAddPost.addEventListener('submit', (event) => {
  event.preventDefault();

  const target = event.target,
    name = inputPostName.value.trim(),
    img = inputPostLink.value.trim();
  
  createPost(img, name);
  closePopap(target.closest('.popup'));
})

//Загрузка постов при старте страницы
initialCards.forEach((item) => {
  let img = item.link,
    name = item.name;

    createPost(img, name);
})