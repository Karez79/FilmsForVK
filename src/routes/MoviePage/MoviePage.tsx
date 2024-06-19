import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../stores/movieStore';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import styles from './MoviePage.css';

const MoviePage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      movieStore.fetchMovieDetails(Number(id));
    }
  }, [id]);

  if (!movieStore.movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moviePage">
      <MovieDetails movie={movieStore.movieDetails} />
      {/* Удалите строку ниже */}
      {/* <MovieAwards id={Number(id)} /> */}
    </div>
  );
});

export default MoviePage;
