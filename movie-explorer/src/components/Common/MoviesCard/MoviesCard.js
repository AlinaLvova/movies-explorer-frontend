import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import { MovieContext } from "../../../contexts/MovieContext";

function MoviesCard({ title, duration, backdrop, isSaved }) {
  const [favourites, setFavourites] = useState(isSaved);
  const { addMovie, removeMovie } = useContext(MovieContext);
  const location = useLocation();
  const [isFavoritesRoute, setIsFavoritesRoute] = useState(
    location.pathname === "/saved-movies"
  );

  function handleClick() {
    if (favourites) {
      removeMovie(title);
    } else {
      addMovie({ title, duration, backdrop });
    }
    setFavourites(!favourites);
  }

  function handleRemoveMovie() {
    removeMovie(title);
    //setFavourites(false);
  }

  useEffect(() => {
    setIsFavoritesRoute(location.pathname === "/saved-movies");
  }, [location.pathname]);

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursString = hours > 0 ? `${hours}ч` : "";
    const minutesString = minutes > 0 ? `${minutes}м` : "";

    return `${hoursString} ${minutesString}`.trim();
  }

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__title">{title}</div>
        <div className="movies-card__duration">{formatDuration(duration)}</div>
      </div>
      <img
        className="movies-card__backdrop"
        src={backdrop}
        alt={`Кадр из фильма: ${title}`}
      />
      {!isFavoritesRoute && (
        <button
          className={`movies-card__favorites-btn link ${
            favourites ? "active" : ""
          }`}
          type="button"
          onClick={handleClick}
        ></button>
      )}
      {isFavoritesRoute && (
        <button
          className={`movies-card__favorites-btn link remove-btn`}
          type="button"
          onClick={handleRemoveMovie}
        ></button>
      )}
    </div>
  );
}

export default MoviesCard;
