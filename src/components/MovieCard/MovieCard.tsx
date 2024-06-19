import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => (
  <div className="movieCard">
    <Link to={`/movie/${movie.id}`}>
      <img
        src={movie.poster.previewUrl || '/default-poster.jpg'}
        alt={movie.name}
        className="movieCard__poster"
      />
      <div className="movieCard__info">
        <h3 className="movieCard__title">{movie.name}</h3>
        <p className="movieCard__year">{movie.year}</p>
        <p className="movieCard__rating">Rating: {movie.rating.kp}</p>
      </div>
    </Link>
  </div>
);

export default MovieCard;
