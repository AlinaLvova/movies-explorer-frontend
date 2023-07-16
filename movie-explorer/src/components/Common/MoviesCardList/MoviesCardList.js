import React, { useState, useEffect, useContext } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieContext } from "../../../contexts/MovieContext";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";

const calculateStartColumnsAndRowsCount = () => {
  if (window.innerWidth >= 1668) return {columns: 4, rows: 3};
  if (window.innerWidth >= 1028) return {columns: 3, rows: 4};
  if (window.innerWidth >= 610) return {columns: 2, rows: 4};
  return {columns: 1, rows: 5};
};

function MoviesCardList({ cards }) {
  const { savedMovies, addMovie, removeMovie } = useContext(MovieContext);
  const { addRows, getRows } = useContext(VisibleRowsContext);

  const startVisibleRows = getRows();
  const [columns, setColumns] = useState(calculateStartColumnsAndRowsCount().columns);

  const [cardCount, setCardCount] = useState(startVisibleRows * columns);

  const calculateColumns = (cards) => {
    const newColumns = calculateStartColumnsAndRowsCount().columns;
    const newRows = calculateStartColumnsAndRowsCount().rows;
    setColumns(newColumns);
    const requiredCardCount = newColumns * newRows;
    if (cards.length < requiredCardCount) {
      setCardCount(cards.length);
    } else {
      setCardCount(requiredCardCount);
    }
  };

  useEffect(() => {
    calculateColumns({ cards });

    window.addEventListener("resize", calculateColumns);

    return () => {
      window.removeEventListener("resize", calculateColumns);
    };
  }, []);

  // useEffect(() => {
  //   calculateColumns(cards);
  // }, [cards.length]);

  const loadMoreCards = () => {
    setCardCount(cardCount + (columns === 1 ? (columns + 1) : columns));
    addRows();
  };

  const visibleCards = cards.slice(0, cardCount);

  return (
    <section className={`movies-card-list ${cardCount < cards.length ? "" : "movies-card-list_padding"}`}>
      <ul className="movies-card-list__container">
        {visibleCards.map((movie, index) => (
          <MoviesCard
            key={index}
            title={movie.nameRU}
            duration={movie.duration}
            backdrop={["https://api.nomoreparties.co/", movie.image.formats.thumbnail.url].join('')}
            isSaved={savedMovies.some(
              (savedMovie) => savedMovie.title === movie.title
            )}
            onAddToSaved={addMovie}
            onRemoveFromSaved={removeMovie}
            trailerLink={movie.trailerLink}
          />
        ))}
      </ul>
      {cardCount < cards.length && (
        <button
          type="button"
          className="movies-card-list__button link"
          onClick={loadMoreCards}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
