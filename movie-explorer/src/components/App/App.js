import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
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

import getAllMovies from "../../utils/MoviesApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [moviesList, setMoviesList] = useState([]);
  const { moviesList, addMovieList } = useContext(MovieContext);
  const { addMovies, removeMovie, addMovie } = useContext(MovieContext);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {}, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleLogin = () => {
    //setIsMenuOpen(true);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
  };

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
    }else{
      setErrorMessage('');
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
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            exact
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            exact
            path="/signup"
            element={<Register onRegister={handleLogin} />}
          />
          <Route
            exact
            path="/profile"
            element={
              <Profile
                onProfile={handleLogin}
                name={"Алина"}
                email={"malina@malina.com"}
                onMenuButtonClick={handleOpenMenu}
              />
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <Movies
                moviesList={moviesList}
                onMenuButtonClick={handleOpenMenu}
                onSearch={handleSearch}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <SavedMovies
                onMenuButtonClick={handleOpenMenu}
                errorMessage={errorMessage}
              />
            }
          />
          <Route exact path="/404" element={<NotFound />} />
          <Route exact path="/" element={<Main />} />
        </Routes>
        <Menu isOpen={isMenuOpen} onClose={closeAllPopups} />
      </VisibleRowsProvider>
    </div>
  );
}

export default App;
