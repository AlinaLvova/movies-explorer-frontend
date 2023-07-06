import { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const addMovie = (movie) => {
    setSavedMovies([...savedMovies, movie]);
  };

  const removeMovie = (movieTitle) => {
    setSavedMovies(savedMovies.filter((movie) => movie.title !== movieTitle)); //после исправить на id
  };

  return (
    <MovieContext.Provider value={{ savedMovies, addMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
