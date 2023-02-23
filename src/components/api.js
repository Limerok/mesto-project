import { loadCardsStart,createPost } from "./card";
import { profileName, profileDescription,profileAvatar} from "./utils";
import { updateProfil,updateAvatar,renderLoading,formNewAvatar,formAddPost,formEditProfil } from "./modal.js";

let myId = '';

const getCards = ()=> {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
      method: 'GET',
      headers: {
        authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      loadCardsStart(result)
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
}

const postCards = (nameCard, linkCard) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards ', {
  method: 'POST',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameCard,
    link: linkCard
  })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    const img = result.link,
      name = result.name,
      likeCount = result.likes.length,
      usersId = result.owner._id,
      cardId = result._id;

    console.log(result)
    createPost(img, name, likeCount, myId, usersId, cardId);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() => {
    renderLoading(false, formAddPost.querySelector('.popup__button-submit'));
  })
}

const deleteCards = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
}

const getDataProfile = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me',{
    method: 'GET',
    headers: {
      authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.src = result.avatar;
    myId = result._id;
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
}

const patchDataProfile = (name, about) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    updateProfil(result)
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() => {
    renderLoading(false, formEditProfil.querySelector('.popup__button-submit'));
  })
}

const putLike = (cardId, likeCount) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  }
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then((result) => {
    likeCount.textContent = result.likes.length;
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
}

const deleteLike = (cardId, likeCount) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  }
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then((result) => {
    likeCount.textContent = result.likes.length;
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
}

const patchAvatar = (avatarUrl) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      updateAvatar(result.avatar)
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      renderLoading(false, formNewAvatar.querySelector('.popup__button-submit'));
    })
}


export {getCards,getDataProfile,patchDataProfile,postCards,myId,deleteCards,putLike,deleteLike,patchAvatar}