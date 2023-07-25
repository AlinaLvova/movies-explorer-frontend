import { createContext, useState, useEffect } from "react";

import mainApi from "../utils/MainApi";
import moviesApi from "../utils/MoviesApi";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  function downloadSavedMovies() {
    const savedMoviesLocalCopy =
      JSON.parse(localStorage.getItem("saved-movies"));

    if (!savedMoviesLocalCopy) {
      mainApi
        .getMovieList()
        .then((movieList) => {
          // Формируем новый массив с объектами фильмов
          const newMovies = movieList.map((movie) => ({
            duration: movie.duration,
            trailerLink: movie.trailerLink,
            backdrop: movie.thumbnail,
            movieId: movie.movieId,
            title: movie.nameRU,
            _id: movie._id,
          }));

          setSavedMovies(newMovies);

          localStorage.setItem(
            "saved-movies",
            JSON.stringify(newMovies)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      setSavedMovies(savedMoviesLocalCopy);
    }
  }

  function downloadMovies() {
    const moviesLocalCopy =
      JSON.parse(localStorage.getItem("sorted-beatfilm-movies")) || [];
      
    if (moviesLocalCopy.length !== 0) {
      setMovies(moviesLocalCopy);
    }else{

        //добавить проверку
    }
  }

  useEffect(() => {
    setSavedMovies([]);
    setMovies([]);
  },[]);

  const addSavedMovie = (movieId) => {
    // Получаем данные из localStorage через промис
    Promise.resolve(localStorage.getItem("beatfilm-movies"))
      .then((moviesData) => JSON.parse(moviesData))
      .then((mov) => {
        // Выполняем поиск нужного фильма
        const movie = mov.find((movie) => movie.id === movieId);

        mainApi
          .saveMovie({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: ["https://api.nomoreparties.co", movie.image.url].join(""),
            trailerLink: movie.trailerLink,
            thumbnail: [
              "https://api.nomoreparties.co",
              movie.image.formats.thumbnail.url,
            ].join(""),
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
          })
          .then((addedMovie) => {
            const updatedSavedMovies = [
              ...savedMovies,
              {
                duration: addedMovie.duration,
                trailerLink: addedMovie.trailerLink,
                backdrop: addedMovie.thumbnail,
                movieId: addedMovie.movieId,
                title: addedMovie.nameRU,
                _id: addedMovie._id,
              },
            ];

            //сохраним в контекст
            setSavedMovies(updatedSavedMovies);

            //сохраняем в localStorage
            localStorage.setItem(
              "saved-movies",
              JSON.stringify(updatedSavedMovies)
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addMovieList = (moviesList) => {
    // Создаем временную переменную для сбора новых значений movies
    let newMoviesList = [];

    moviesList.forEach((movie) => {
      // Добавляем объект во временный массив newMoviesList
      newMoviesList.push({
        duration: movie.duration,
        trailerLink: movie.trailerLink,
        backdrop: [
          "https://api.nomoreparties.co",
          movie.image.formats.thumbnail.url,
        ].join(""),
        movieId: movie.id,
        title: movie.nameRU,
      });
    });

    setMovies(newMoviesList);

    localStorage.setItem("sorted-beatfilm-movies", JSON.stringify(newMoviesList));
  };

  const addSavedMovieList = (savedMoviesList) => {
    setSavedMovies(savedMoviesList);
  };

  const removeSavedMovie = (movieId) => {
    const index = savedMovies.findIndex(
      (savedMovie) => savedMovie.movieId === movieId
    );

    mainApi
      .deleteMovie(savedMovies[index]._id)
      .then((response) => {
        const updatedSavedMovies = savedMovies.filter(
          (savedMovie, i) => i !== index
        );
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem(
          "saved-movies",
          JSON.stringify(updatedSavedMovies)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <MovieContext.Provider
      value={{
        savedMovies,
        addSavedMovie,
        removeSavedMovie,
        addMovieList,
        downloadMovies,
        downloadSavedMovies,
        addSavedMovieList,
        movies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
