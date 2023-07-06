import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieContext } from "../../../contexts/MovieContext";

const calculateStartColumnsCount = () => {
  if (window.innerWidth >= 1668) return 4;
  if (window.innerWidth >= 1028) return 3;
  if (window.innerWidth >= 610) return 2;
  return 1;
};

function MoviesCardList({ cards, isExpanded, onRowsCounter, rows }) {
  const { savedMovies, addMovie, removeMovie } = useContext(MovieContext);
  const location = useLocation();

  const startVisibleRows = rows;
  const gridRef = useRef(null);
  const [columns, setColumns] = useState(calculateStartColumnsCount());

  const [cardCount, setCardCount] = useState(rows * columns);

  const calculateColumns = (cards) => {
    const gridElement = gridRef.current;
    if (gridElement && gridElement.firstElementChild) {
      const gridWidth = gridElement.offsetWidth;
      const itemWidth = gridElement.firstElementChild.offsetWidth;
      const newColumns = Math.floor(gridWidth / itemWidth);
      setColumns(newColumns);
      const requiredCardCount = newColumns * startVisibleRows;
      if (cards.length < requiredCardCount) {
        setCardCount(cards.length);
      } else {
        setCardCount(requiredCardCount);
      }
    }
  };

  // useEffect(() => {
  //   calculateColumns({cards});
  // }, [location.pathname]);

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
    onRowsCounter();
  };

  const visibleCards = cards.slice(0, cardCount);

  return (
    <section className="movies-card-list">
      <ul ref={gridRef} className="movies-card-list__container">
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
