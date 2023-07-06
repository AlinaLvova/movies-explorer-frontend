import React, { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import "./SavedMovies.css";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({ onRowsCounter, rows }) {
  const { savedMovies, removeMovie } = useContext(MovieContext);

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={savedMovies}
        rows={rows}
        onRowsCounter={onRowsCounter}
        onRemoveFromSaved={removeMovie}
      />
    </div>
  );
}

export default SavedMovies;
