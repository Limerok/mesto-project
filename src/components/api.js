import { checkResponse } from "./utils";

const getCards = ()=> {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
      method: 'GET',
      headers: {
        authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
      }
    })
    .then(checkResponse)
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
  .then(checkResponse)
}

const deleteCards = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
    }
  })
  .then(checkResponse)
}

const getDataProfile = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me',{
    method: 'GET',
    headers: {
      authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37'
    }
  })
  .then(checkResponse)
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
  .then(checkResponse)
}

const putLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  }
  })
  .then(checkResponse)
}

const deleteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '00d0c259-9510-40e2-8a54-40ce9400cb37',
    'Content-Type': 'application/json'
  }
  })
  .then(checkResponse)
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
    .then(checkResponse)
}

export {getCards,getDataProfile,patchDataProfile,postCards,deleteCards,putLike,deleteLike,patchAvatar}