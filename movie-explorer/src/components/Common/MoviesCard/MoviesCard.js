import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import image_404 from "../../../images/404.webp";


import "./MoviesCard.css";
import { MovieContext } from "../../../contexts/MovieContext";

function MoviesCard({ movieId, title, duration, backdrop, trailerLink}) {
  const [favourites, setFavourites] = useState(false);
  const { addSavedMovie, removeSavedMovie, savedMovies, movies } = useContext(MovieContext);
  const location = useLocation();
  const [isFavoritesRoute, setIsFavoritesRoute] = useState(
    location.pathname === "/saved-movies"
  );
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if( !isFavoritesRoute ) {
      if(savedMovies) {
        const isFavorite = savedMovies.some(movie => movie.movieId === movieId);
        setFavourites(isFavorite);
      }
    }
  }, [savedMovies, movies, isFavoritesRoute, movieId]);

  function handleClick(event) {
    event.preventDefault();
    if (favourites) {
      removeSavedMovie(movieId);
    } else {
      addSavedMovie(movieId);
    }
    setFavourites(!favourites);
  }

  function handleRemoveMovie(event) {
    event.preventDefault();
    removeSavedMovie(movieId);
    setFavourites(false);
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
    <li className="movies-card">
      <Link
        className="movies-card__link"
        to={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <div className="movies-card__container">
          <div className="movies-card__wrapper">
            <h2 className="movies-card__title">{title}</h2>
            <span className="movies-card__duration">
              {formatDuration(duration)}
            </span>
          </div>
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
        {imageError ? (
          <img
            className="movies-card__backdrop"
            src={image_404}
            alt="not found"
          />
        ) : (
        <img
          className="movies-card__backdrop"
          src={backdrop}
          alt={`Кадр из фильма: ${title}` }
          onError={handleImageError}
        />
        )}
      </Link>
    </li>
  );
}

export default MoviesCard;
