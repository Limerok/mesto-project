const postsList = document.querySelector('.posts__list'),
  templatePost = document.querySelector('#template-post').content,
  popupEditProfile = document.querySelector('.popup_edit-profile'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  popupAddPost = document.querySelector('.popup_add-post'),
  popupZoomImage = document.querySelector('.popup_zoom-image'),
  zoomImage = popupZoomImage.querySelector('.popup__zoom-image'),
  zoomDescription = popupZoomImage.querySelector('.popup__zoom-description'),
  formElement = document.querySelectorAll('form');


//Карточки при загрузке
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    altName: 'Пейзаж заснеженных гор с маленькими водоемами'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    altName: 'Пруд окруженный зимним лесом'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    altName: 'Множество панельных домов, в некоторых окнах горит свет'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    altName: 'Низкая трава на фоне гор Камчатки'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    altName: 'Железнодорожный путь, проложенный через лесной массив'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    altName: 'Отвесные береговые скалы зимнего озера'
  }
];

initialCards.forEach((item) => {
  const newPost = templatePost.querySelector('.post').cloneNode(true);
  newPost.querySelector('.post__image').src = item.link;
  newPost.querySelector('.post__image').alt = item.altName;
  newPost.querySelector('.post__name').textContent = item.name;
  postsList.append(newPost);
})

//Получение данных профиля
function editProfil() {
  const inputText = popupEditProfile.querySelectorAll('.popup__input-text');
  inputText.forEach((item) => {
    if (item.getAttribute('name') === 'name-surname') {
      item.value = profileName.textContent.trim();
    } else if (item.getAttribute('name') === 'about-me') {
      item.value = profileDescription.textContent.trim();
    }
  })
}

//Обновление полей нового Поста
function reloadPostInput(inputForm) {
  inputForm.forEach((item) => {
    if (item.getAttribute('name') === 'name-post') {
      item.value = '';
    } else if (item.getAttribute('name') === 'link-image') {
      item.value= '';
    }
  })
}

//Открытие фотографии
function openImage(target) {
  const imageSrc = target.getAttribute('src'),
   postName = target.closest('.post').querySelector('.post__name').textContent;

  zoomImage.src = imageSrc;
  zoomDescription.textContent = postName;
}

//Закрытие по кнопке Отправить
function hiddenPopap(target) {
  target.closest('.popup_opened').classList.remove('popup_opened');
}

//Сохранение инпутов
function saveInput(inputForm, newPost) {
  inputForm.forEach((item) => {
    if (item.getAttribute('name') === 'name-surname') {
      profileName.textContent = item.value.trim();
    } else if (item.getAttribute('name') === 'about-me') {
      profileDescription.textContent = item.value.trim();
    } else if (item.getAttribute('name') === 'name-post') {
      newPost.querySelector('.post__name').textContent = item.value.trim();
      item.value = '';
    } else if (item.getAttribute('name') === 'link-image') {
      newPost.querySelector('.post__image').src = item.value.trim();
      item.value= '';
    }
  })
}

//Реакции на события
document.addEventListener('click', (event) => {
  let target = event.target;

  if (target.classList.contains('profile__edit')) {//Редактор профиля
    editProfil();
    popupEditProfile.classList.add('popup_opened');
  } else if (target.classList.contains('profile__add-post')) {//Добавление поста
    const inputForm = popupAddPost.querySelectorAll('.popup__input-text');
    reloadPostInput(inputForm);
    popupAddPost.classList.add('popup_opened');
  } else if (target.classList.contains('post__image')) {//Зум изображения
    openImage(target);
    popupZoomImage.classList.add('popup_opened');
  } else if (target.classList.contains('popup__close') ||
  target.classList.contains('popup')) {//Закрытие popup
    target.closest('.popup_opened').classList.remove('popup_opened');
  } else if (target.classList.contains('post__like')) { //Лайк карточки
    target.classList.toggle('post__like_active');
  } else if (target.classList.contains('post__trash')) { //Удаление карточки
    target.closest('.post').remove();
  }
})

document.addEventListener('submit', (event) => {
  event.preventDefault();
  let target = event.target;

  if (target.getAttribute('name') === 'edit-profile') {
    const inputForm = target.querySelectorAll('.popup__input-text');
    
    saveInput(inputForm);
    hiddenPopap(target);
  } else if (target.getAttribute('name') === 'new-post') {
    const inputForm = target.querySelectorAll('.popup__input-text'),
      newPost = templatePost.querySelector('.post').cloneNode(true);
    
    saveInput(inputForm, newPost);
    postsList.prepend(newPost);
    hiddenPopap(target);
  }
})