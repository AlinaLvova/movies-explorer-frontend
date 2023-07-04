import React, { useState } from 'react';

import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({cards}) {
  return (
    <div className="movies">
    <SearchForm />
    <MoviesCardList cards={cards}/>
    </div>
  );
}

export default Movies;
