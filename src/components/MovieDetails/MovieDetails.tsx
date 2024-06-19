import React from 'react';
import './MovieDetails.css';

interface Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  rating: number;
  releaseDate: string;
  genres: string[];
}

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="movieDetails">
      <img src={movie.poster} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
      <p>Release Date: {movie.releaseDate}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
    </div>
  );
};

export default MovieDetails;
