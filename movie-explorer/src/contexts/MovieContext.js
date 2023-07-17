import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  const addMovie = (movie) => {
    setSavedMovies([...savedMovies, movie]);
  };

  const addMovies = (movies) => {
    setSavedMovies(movies);
  };

  const addMovieList = (movieList) => {
    setMoviesList(movieList);
  };

  const removeMovie = (movieTitle) => {
    setSavedMovies(savedMovies.filter((movie) => movie.title !== movieTitle)); //после исправить на id
  };

  return (
    <MovieContext.Provider
      value={{ savedMovies, addMovie, removeMovie, addMovies, addMovieList, moviesList }}
    >
      {children}
    </MovieContext.Provider>
  );
};
