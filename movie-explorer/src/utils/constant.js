const MENU_ICON_SCREEN_WIDTH = 769;

const BASE_URL = 'https://api.movie.nomoredomains.rocks';

const ERROR_MESSAGE_SEARCH_MOVIES_API = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
const ERROR_MESSAGE_NOT_FOUND = "Ничего не найдено.";
const ERROR_MESSAGE_NOT_KEY_SEARCH = "Необходимо ввести ключевое слово.";
const ERROR_MESSAGE_INVALID_EMAIL = "Пожалуйста, укажите корректный email в формате 'xxx@xx.xx', где xxx может содержать буквы, цифры, а также символы подчеркивания, тире и точки, а xx представляет доменное имя, состоящее из двух или трех букв, например, com, net, org, co.uk и т.д";
const SUCCESS_MESSAGE_UPDATE_PROFILE = "Новые данные профиля успешно сохранены.";
const SHORT_MOVIE_DURATION = 40;

module.exports = {
  MENU_ICON_SCREEN_WIDTH,
  BASE_URL,
  ERROR_MESSAGE_SEARCH_MOVIES_API,
  ERROR_MESSAGE_NOT_FOUND,
  SHORT_MOVIE_DURATION,
  ERROR_MESSAGE_NOT_KEY_SEARCH,
  ERROR_MESSAGE_INVALID_EMAIL,
  SUCCESS_MESSAGE_UPDATE_PROFILE,
};
