import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MovieProvider, MovieContext } from "../../contexts/MovieContext";
import { VisibleRowsProvider } from "../../contexts/VisibleRowsContext";
import { PreloaderContext } from "../../contexts/PreloaderContext";
import { SearchContext } from "../../contexts/SearchContext";
import {
  SHORT_MOVIE_DURATION,
  ERROR_MESSAGE_NOT_FOUND,
} from "../../utils/constant";

import Menu from "../Common/Header/Menu/Menu";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import movieList from "../../utils/movieList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

import getAllMovies from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [moviesList, setMoviesList] = useState([]);
  const { moviesList, addMovieList } = useContext(MovieContext);
  const { addMovies, removeMovie, addMovie } = useContext(MovieContext);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleLogin = () => {
    //setIsMenuOpen(true);
  };

  const handleSetLoggedIn = (value) => {
    setLoggedIn(value);
  };

  const handleSetCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
  };

  // проверка токена и получение данных пользователя
  function handleCheckToken() {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    } else {
      setLoggedIn(false);

    }
  }

  function findMovieByTitle(storedMovies) {
    let sortedMovies = storedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
    );

    localStorage.setItem(
      "moviesListAfterSearching",
      JSON.stringify(sortedMovies)
    );

    return sortedMovies;
  }

  function findMovieByDuration(storedMovies) {
    let sortedMovies = storedMovies.filter(
      (movie) => movie.duration < SHORT_MOVIE_DURATION
    );

    return sortedMovies;
  }

  function searchFilter(isCheckedSwitcher) {
    const storedMovies = JSON.parse(localStorage.getItem("beatfilm-movies"));

    let sortedMovies;
    //поиск по названию

    sortedMovies = findMovieByTitle(storedMovies);

    console.log(isCheckedSwitcher);

    if (isCheckedSwitcher) {
      sortedMovies = findMovieByDuration(sortedMovies);
    }

    if (sortedMovies.length === 0) {
      setErrorMessage(ERROR_MESSAGE_NOT_FOUND);
    } else {
      setErrorMessage("");
    }

    addMovieList(sortedMovies);
  }

  function handleSearch(isCheckedSwitcher) {
    // Проверяем, есть ли уже сохраненные данные в localStorage
    const storedMovies = JSON.parse(localStorage.getItem("beatfilm-movies"));

    // Если в localStorage нет сохраненных данных, получаем данные из сервиса Beatfilm-Movies
    if (!storedMovies) {
      //отобразить прелоадер
      setStatePreloader(true);

      getAllMovies()
        .then((data) => {
          // Сохраняем данные в localStorage
          localStorage.setItem("beatfilm-movies", JSON.stringify(data));

          searchFilter(isCheckedSwitcher);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .finally(() => {
          //скрыть прелоадер
          setStatePreloader(false);
        });
    } else {
      // Если данные уже есть в localStorage, используем их

      //отобразить прелоадер перед началом поиска
      setStatePreloader(true);

      try {
        searchFilter(isCheckedSwitcher);
      } catch (error) {
        setErrorMessage();
      } finally {
        // Скрыть прелоадер после завершения поиска
        setStatePreloader(false);
      }
    }
  }

  return (
    <div className="page">
      <VisibleRowsProvider>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Main />
              )
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                setLoggedIn={handleSetLoggedIn}
                setCurrentUser={handleSetCurrentUser}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                setLoggedIn={handleSetLoggedIn}
                setCurrentUser={handleSetCurrentUser}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                onProfile={handleLogin}
                name={currentUser.name}
                email={currentUser.email}
                onMenuButtonClick={handleOpenMenu}
                setLoggedIn={handleSetLoggedIn}
                setCurrentUser={handleSetCurrentUser}
              />
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                moviesList={moviesList}
                onMenuButtonClick={handleOpenMenu}
                onSearch={handleSearch}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                onMenuButtonClick={handleOpenMenu}
                errorMessage={errorMessage}
              />
            }
          />

          {/* <Route path="/" element={<Main />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Menu isOpen={isMenuOpen} onClose={closeAllPopups} />
      </VisibleRowsProvider>
    </div>
  );
}

export default App;
