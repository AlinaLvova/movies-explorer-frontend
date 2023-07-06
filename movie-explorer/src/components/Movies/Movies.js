import React, { useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";

function Movies({ cards, onRowsCounter, rows }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList 
        cards={cards}
        rows={rows}
        onRowsCounter={onRowsCounter} />
    </div>
  );
}

export default Movies;
