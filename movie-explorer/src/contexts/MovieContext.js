import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([ {
    title: 'Побег из Шоушенка',
    duration: 142,
    backdrop: 'https://img02.rl0.ru/afisha/e780x-i/daily.afisha.ru/uploads/images/9/c8/9c8dbd93078c4276a741b47c3fe1502b.jpg',
  },
  {
    title: 'Крестный отец',
    duration: 175,
    backdrop: 'https://img02.rl0.ru/afisha/e780x-i/daily.afisha.ru/uploads/images/9/c8/9c8dbd93078c4276a741b47c3fe1502b.jpg',
  },
  {
    title: 'Зеленая миля',
    duration: 189,
    backdrop: 'https://img02.rl0.ru/afisha/e780x-i/daily.afisha.ru/uploads/images/9/c8/9c8dbd93078c4276a741b47c3fe1502b.jpg',
  }]);

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
