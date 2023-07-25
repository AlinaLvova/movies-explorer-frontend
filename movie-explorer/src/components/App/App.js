import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
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
// import movieList from "../../utils/movieList";
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
  const { addMovieList, downloadMovies, downloadSavedMovies, addSavedMovieList } =
    useContext(MovieContext);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { searchTermMovies, searchTermSavedMovies } = useContext(SearchContext);

  useEffect(() => {
    handleCheckToken();
    // downloadMovies();
    // downloadSavedMovies();
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
              downloadMovies();
              downloadSavedMovies();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      setLoggedIn(false);
    }
  }

  function findMovieByTitle(storedMovies) {
    let sortedMovies = storedMovies.filter((movie) => {
      if (movie.title) {
        return movie.title.toLowerCase().includes(searchTermSavedMovies.toLowerCase());
      }
      if (movie.nameRU) {
        return movie.nameRU.toLowerCase().includes(searchTermMovies.toLowerCase());
      }
      return null;
    });

    return sortedMovies;
  }

  function findMovieByDuration(storedMovies) {
    let sortedMovies = storedMovies.filter(
      (movie) => movie.duration < SHORT_MOVIE_DURATION
    );

    return sortedMovies;
  }

  function searchFilter(isCheckedSwitcher, movieListName) {
    let sortedMovies;
    //поиск по названию
    sortedMovies = findMovieByTitle(JSON.parse(localStorage.getItem(movieListName)));

    if (isCheckedSwitcher) {
      sortedMovies = findMovieByDuration(sortedMovies);
    }

    if (sortedMovies.length === 0) {
      setErrorMessage(ERROR_MESSAGE_NOT_FOUND);
    } else {
      setErrorMessage("");
    }

    if (movieListName === "beatfilm-movies")
      addMovieList(sortedMovies);
    if (movieListName === "saved-movies"){
      addSavedMovieList(sortedMovies);
    }
  }

  return (
    <div className="page">
      <VisibleRowsProvider>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/movies" replace /> : <Main />}
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
                onMenuButtonClick={handleOpenMenu}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                loggedIn={loggedIn}
                searchFilter={searchFilter}
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
                setErrorMessage={setErrorMessage}
                searchFilter={searchFilter}
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
