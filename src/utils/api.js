class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getItems() {
    return fetch(`${this._baseUrl}/cards`, { 
      headers: this._headers })
      .then((res) => this._checkResponse(res));
  };

  setItem({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        name: name, 
        link: link 
      }),
    }).then((res) => this._checkResponse(res));
  };

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  changeLikeCardStatus(_id, isLiked) {
    return isLiked ? this.deleteLike(_id) : this.addLike(_id);
  };

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    }).then((res) => this._checkResponse(res));
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { 
      headers: this._headers })
      .then((res) => this._checkResponse(res));
  };

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => this._checkResponse(res));
  };

};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "53225a79-808c-4502-af98-76089dda326c",
    "Content-Type": "application/json",
  },
});

export default api;