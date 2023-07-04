import React, { useState } from "react";

import "./MoviesCard.css";

function MoviesCard({ title, duration, backdrop }) {
  const [favourites, setFavourites] = useState(false);

  function handleClick() {
    setFavourites(!favourites);
  }

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
      <button
        className={`movies-card__favorites-btn link ${favourites ? 'active' : ''}`}
        type="button"
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default MoviesCard;
