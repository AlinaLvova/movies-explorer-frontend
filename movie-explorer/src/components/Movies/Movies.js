import React, { useState, useContext, useEffect } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../Common/MoviesCardList/MoviesCardList";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { PreloaderContext } from "../../contexts/PreloaderContext";
import { MovieContext } from "../../contexts/MovieContext";
import { SearchContext } from "../../contexts/SearchContext";
import getAllMovies from "../../utils/MoviesApi";


function Movies({ onMenuButtonClick, searchFilter, errorMessage, setErrorMessage}) {
  const {isActivePreloader, setStatePreloader} = useContext(PreloaderContext);
  const {movies, downloadMovies} = useContext(MovieContext);
  const {searchTermMovies, setSearchTermMovies} = useContext(SearchContext);
  const {switcherMode, setSwitcherMode} = useContext(SearchContext);
 
  useEffect(() => {
    downloadMovies();
  }, []);

  async function handleSearch() {
    const optionsData = {
      searchQuery: searchTermMovies,
      switcherMode: switcherMode,
    };

    localStorage.setItem(
      "options-beatfilm-movies",
      JSON.stringify(optionsData)
    );

    // Проверяем, есть ли уже сохраненные данные в localStorage
    const storedMovies = JSON.parse(localStorage.getItem("beatfilm-movies"));

    //отобразить прелоадер
    setStatePreloader(true);

    // Если в localStorage нет сохраненных данных, получаем данные из сервиса Beatfilm-Movies
    if (!storedMovies) {
      getAllMovies()
        .then((data) => {
          // Сохраняем данные в localStorage
          localStorage.setItem("beatfilm-movies", JSON.stringify(data));

          searchFilter(switcherMode, "beatfilm-movies");
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

      try {
        searchFilter(switcherMode, "beatfilm-movies");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setStatePreloader(false);
      }
    }
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
            setSwitcherMode={setSwitcherMode}
            switcherMode={switcherMode}
            setSearchQuery={setSearchTermMovies}
            searchQuery={searchTermMovies}
            localStorageName={"options-beatfilm-movies"}
            isSaved={false}
          />
          {!isActivePreloader && <MoviesCardList
            movies={movies}
            isActive={isActivePreloader}
            loadMoreButtomMove={true}
          />}
          {isActivePreloader && <Preloader/>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
