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

function MoviesCardList({ movies, isActive, loadMoreButtomMove}) {
  const { savedMovies, addSavedMovie, removeSavedMovie } = useContext(MovieContext);
  const { addRows, getRows } = useContext(VisibleRowsContext);

  const startVisibleRows = getRows();
  const [columns, setColumns] = useState(calculateStartColumnsAndRowsCount().columns);

  const [cardCount, setCardCount] = useState(startVisibleRows * columns);

  const calculateColumns = (movies) => {
    const newColumns = calculateStartColumnsAndRowsCount().columns;
    const newRows = calculateStartColumnsAndRowsCount().rows;
    setColumns(newColumns);
    const requiredCardCount = newColumns * newRows;
    if (movies.length < requiredCardCount) {
      setCardCount(movies.length);
    } else {
      setCardCount(requiredCardCount);
    }
  };

  useEffect(() => {
    calculateColumns({ movies });

    window.addEventListener("resize", calculateColumns);

    return () => {
      window.removeEventListener("resize", calculateColumns);
    };
  }, []);

  const loadMoreCards = () => {
    setCardCount(cardCount + (columns === 1 ? (columns + 1) : columns));
    addRows();
  };

  const visibleCards = !loadMoreButtomMove ? movies : movies.slice(0, cardCount);

  return (
    <section className={`movies-card-list ${cardCount < movies.length ? "" : "movies-card-list_padding"} ${isActive ? "disabled" : ""}`}>
      <ul className="movies-card-list__container">
        {visibleCards.length > 0 &&
          visibleCards.map((movie, index) => (
          <MoviesCard
            key={index}
            movieId={movie.movieId}
            title={movie.title}
            duration={movie.duration}
            backdrop={movie.backdrop}
            onAddToSaved={addSavedMovie}
            onRemoveFromSaved={removeSavedMovie}
            trailerLink={movie.trailerLink}
          />
        ))}
      </ul>
      {(cardCount < movies.length && loadMoreButtomMove) && (
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
