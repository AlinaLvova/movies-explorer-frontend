import React, { useState, useContext } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Preloader from "./Preloader/Preloader";
import { PreloaderContext } from "../../contexts/PreloaderContext";

function Movies({ moviesList, onMenuButtonClick, onSearch, errorMessage, setErrorMessage}) {
  const {isActivePreloader, setStatePreloader} = useContext(PreloaderContext);

  function handleSearch(value){
    console.log('movies', value);
    onSearch(value);
  }

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="movies">
          <SearchForm 
            onSearch={handleSearch}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <MoviesCardList
            moviesList={moviesList}
            isActive={isActivePreloader}
          />
          {isActivePreloader && <Preloader/>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
