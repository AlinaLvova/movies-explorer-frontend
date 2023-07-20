import { BASE_URL } from "../utils/constant";

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  // функция обработки результата ответа сервера
  _handleResponse(response, errorMessage) {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((data) => {
        const error = new Error(errorMessage);
        error.status = response.status;
        error.message = data.message;
        throw error;
      });
    }
  }

  // Сохранить фильм в избранное
  saveMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ movie }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о фильме не были успешно получены сервером"
      );
    });
  }

  //удалить фильм по id
  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о фильме не были успешно удалены на сервере"
      );
    });
  }

  //получить список фильмов
  getMovieList() {
    return fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      method: "GET",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о списке фильмов не были успешно получены"
      );
    });
  }

  //получить информацию о пользователе
  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о пользователе не были успешно получены"
      );
    });
  }

  //обновление данных о пользователе на сервере
  updateUserInfo(data) {
    const token = localStorage.getItem('token');

    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о пользователе не были успешно обновлены на сервере"
      );
    });
  }

  // Авторизироваться
  login(userData) {
    return fetch(`${this.baseUrl}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(userData),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Не удалось успешно авторизоваться"
      );
    });
  }

  // Зарегистрироваться
  register(userData) {
    console.log("userdata from fetch", userData);
    return fetch(`${this.baseUrl}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(userData),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Не удалось успешно зарегистрироваться"
      );
    });
  }
}

const apiConfig = {
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const mainApi = new Api(apiConfig);

export default mainApi;
