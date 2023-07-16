// запрос на получения фильмов с Beatfilm 

export default function getAllMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then((res) => res.json())
        .then((movies) => movies)
        .catch((err) => err);
  }
