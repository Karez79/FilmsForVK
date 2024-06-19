import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

interface Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  rating: number;
  releaseDate: string;
  genres: string[];
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movieList">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
