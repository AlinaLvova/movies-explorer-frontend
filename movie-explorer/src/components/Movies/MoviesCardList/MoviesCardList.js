import React, { useState, useEffect, useRef } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  const startVisibleRows = 2;
  const gridRef = useRef(null);
  const [columns, setColumns] = useState(0);

  const [cardCount, setCardCount] = useState(6);

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

  useEffect(() => {
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
