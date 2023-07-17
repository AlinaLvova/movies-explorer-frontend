// запрос на получения фильмов с Beatfilm
import { ERROR_MESSAGE_SEARCH_MOVIES_API } from "../utils/constant";

export default function getAllMovies() {
  return fetch("https://api.nomoreparties.co/beatfilm-movies")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(ERROR_MESSAGE_SEARCH_MOVIES_API);
      }
    })
    .catch((err) => {
        throw new Error(ERROR_MESSAGE_SEARCH_MOVIES_API);
    });
}
