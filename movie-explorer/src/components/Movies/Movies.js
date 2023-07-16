import React, { useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";

function Movies({ cards, onMenuButtonClick }) {
  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="movies">
          <SearchForm />
          <MoviesCardList
            cards={cards}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
