import React, { useState, useEffect, useContext } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieContext } from "../../../contexts/MovieContext";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";

const calculateStartColumnsCount = () => {
  if (window.innerWidth >= 1668) return 4;
  if (window.innerWidth >= 1028) return 3;
  if (window.innerWidth >= 610) return 2;
  return 1;
};

function MoviesCardList({ cards }) {
  const { savedMovies, addMovie, removeMovie } = useContext(MovieContext);
  const { addRows, getRows } = useContext(VisibleRowsContext);

  const startVisibleRows = getRows();
  const [columns, setColumns] = useState(calculateStartColumnsCount());

  const [cardCount, setCardCount] = useState(startVisibleRows * columns);

  const calculateColumns = (cards) => {
    const newColumns = calculateStartColumnsCount();
    setColumns(newColumns);
    const requiredCardCount = newColumns * startVisibleRows;
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
    setCardCount(cardCount + columns);
    addRows();
  };

  const visibleCards = cards.slice(0, cardCount);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {visibleCards.map((movie, index) => (
          <MoviesCard
            key={index}
            title={movie.title}
            duration={movie.duration}
            backdrop={movie.backdrop}
            isSaved={savedMovies.some(
              (savedMovie) => savedMovie.title === movie.title
            )}
            onAddToSaved={addMovie}
            onRemoveFromSaved={removeMovie}
          />
        ))}
      </ul>
      {cardCount < cards.length && (
        <button
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
