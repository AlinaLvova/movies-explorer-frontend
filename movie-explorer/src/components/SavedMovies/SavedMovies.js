import React, { useContext } from "react";

import { MovieContext } from "../../contexts/MovieContext";
import "./SavedMovies.css";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";

function SavedMovies({ onRowsCounter, rows, onMenuButtonClick }) {
  const { savedMovies, removeMovie } = useContext(MovieContext);

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="saved-movies">
          <SearchForm />
          <MoviesCardList
            cards={savedMovies}
            rows={rows}
            onRowsCounter={onRowsCounter}
            onRemoveFromSaved={removeMovie}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
