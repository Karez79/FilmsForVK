import React, { useEffect, useState } from 'react';
import { fetchRandomMovie } from '../../utils/api';
import './RandomMovie.css';

const RandomMovie: React.FC = () => {
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    const getRandomMovie = async () => {
      const data = await fetchRandomMovie();
      setMovie(data);
    };
    getRandomMovie();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="randomMovie">
      <img src={movie.poster.url} alt={movie.name} />
      <h1>{movie.name}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating.kp}</p>
      <p>Release Date: {movie.year}</p>
      <div className="genres">
        {movie.genres.map((genre: any) => (
          <span key={genre.name} className="genre">{genre.name}</span>
        ))}
      </div>
    </div>
  );
};

export default RandomMovie;
