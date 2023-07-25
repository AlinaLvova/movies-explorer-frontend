import React, { useState, useEffect, useContext } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieContext } from "../../../contexts/MovieContext";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";

function MoviesCardList({ movies, isActive, loadMoreButtomMove }) {
  const {
    addRows,
    getRows,
    cardCount,
    setCardCount,
    calculateStartColumnsAndRowsCount,
  } = useContext(VisibleRowsContext);
  const [visibleCards, setVisibleCards] = useState([]);

  const startVisibleRows = getRows();

  const calculateColumns = () => {
    const { columns, rows } = calculateStartColumnsAndRowsCount();
    const requiredCardCount = columns * rows;
    setCardCount(requiredCardCount);
  };

  useEffect(() => {
    calculateColumns(); // Initial calculation on component mount

    window.addEventListener("resize", calculateColumns);

    return () => {
      window.removeEventListener("resize", calculateColumns);
    };
  }, []);

  const loadMoreCards = () => {
    const newCardCount = cardCount + calculateStartColumnsAndRowsCount().columns;
    setCardCount(newCardCount);
    addRows();
  };

  useEffect(() => {
    setVisibleCards(
      !loadMoreButtomMove ? movies : movies.slice(0, cardCount)
    );
  }, [cardCount, loadMoreButtomMove, movies]);

  return (
    <section
      className={`movies-card-list ${
        cardCount < movies.length ? "" : "movies-card-list_padding"
      } ${isActive ? "disabled" : ""}`}
    >
      <ul className="movies-card-list__container">
        {visibleCards.length > 0 &&
          visibleCards.map((movie, index) => (
            <MoviesCard
              key={index}
              movieId={movie.movieId}
              title={movie.title}
              duration={movie.duration}
              backdrop={movie.backdrop}
              trailerLink={movie.trailerLink}
            />
          ))}
      </ul>
      {cardCount < movies.length && loadMoreButtomMove && (
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
