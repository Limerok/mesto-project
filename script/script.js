const postsList = document.querySelector('.posts__list'),
  templatePost = document.querySelector('#template-post').content,
  popup = document.querySelector('.popup'),
  popupZoom = document.querySelector('.popup__zoom'),
  popupForm = document.querySelectorAll('.popup__form'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  popupInputText = document.querySelectorAll('.popup__input-text'),
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

//Скрытие форм
function hiddenPopap() {
  popupZoom.setAttribute('style', 'display: none');
  popupForm.forEach((item) => {
    item.setAttribute('style', 'display: none');
  })
}

//Закрытие popup
function closePopup() {
  popup.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.5);');
  popup.classList.remove('popup_opened');
}

//Открытие картинки
function openImage(target) {
  hiddenPopap();
  const postName = target.closest('.post').querySelector('.post__name'),
    popupZoomImage = popupZoom.querySelector('.popup__zoom-image'),
    popupZoomDescription = popupZoom.querySelector('.popup__zoom-description');

  popupZoomImage.src = target.getAttribute('src');
  popupZoomImage.alt = target.getAttribute('alt');
  popupZoomDescription.textContent = postName.textContent;
  popup.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9);');
  popupZoom.setAttribute('style', 'display: block;')
  popup.classList.add('popup_opened');
}

//Открытие редактора Профиля
function editProfil() {
  hiddenPopap();
  popup.classList.add('popup_opened');

  popupInputText.forEach((item) => {
    if (item.getAttribute('name') === 'name-surname') {
      item.value = profileName.textContent.trim();
    } else if (item.getAttribute('name') === 'about-me') {
      item.value = profileDescription.textContent.trim();
    }
  })
  popupForm.forEach((item) => {
    if (item.getAttribute('name') === 'edit-profile') {
      item.setAttribute('style', 'display: block');
    } 
  })
}

//Открытие добавления Поста
function addNewPost() {
  hiddenPopap();
  popup.classList.add('popup_opened');

  popupInputText.forEach((item) => {
    if (item.getAttribute('name') === 'name-post') {
      item.value = '';
    } else if (item.getAttribute('name') === 'link-image') {
      item.value= '';
    }
  })

  popupForm.forEach((item) => {
    if (item.getAttribute('name') === 'new-post') {
      item.setAttribute('style', 'display: block');
    } 
  })
}

document.addEventListener('click', (event) => {

  let target = event.target;

  if (target.classList.contains('post__trash')) { //Удаление карточки
    target.closest('.post').remove();
  } else if (target.classList.contains('post__like')) { //Лайк карточки
    target.classList.toggle('post__like_active');
  } else if (target.classList.contains('post__image')) {//Открытие картинки
    openImage(target);
  } else if (target.classList.contains('popup__close')) {//Закрытие popup
    closePopup();
  } else if (target.classList.contains('profile__edit')) {//Редактор профиля
    editProfil();
  } else if (target.classList.contains('profile__add-post')) {//Открытие добавления поста
    addNewPost();
  }
})


//Отправка формы
function savedProfil (form) {
  const inputForm = form.querySelectorAll('.popup__input-text');

  inputForm.forEach((item) => {
    if (item.getAttribute('name') === 'name-surname') {
      profileName.textContent = item.value.trim();
    } else if (item.getAttribute('name') === 'about-me') {
      profileDescription.textContent = item.value.trim();
    }
  })

  closePopup();
}

function savedPost (form) {
  const inputForm = form.querySelectorAll('.popup__input-text'),
    newPost = templatePost.querySelector('.post').cloneNode(true);

  inputForm.forEach((item) => {
    if (item.getAttribute('name') === 'name-post') {
      newPost.querySelector('.post__name').textContent = item.value.trim();
      item.value = '';
    } else if (item.getAttribute('name') === 'link-image') {
      newPost.querySelector('.post__image').src = item.value.trim();
      item.value= '';
    }
  })
  
  postsList.prepend(newPost);
  closePopup();
}

formElement.forEach((item) => {
  if (item.getAttribute('name') === 'edit-profile') {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      savedProfil(item);
    })
  } else if (item.getAttribute('name') === 'new-post') {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      savedPost(item);
    })
  }
})

