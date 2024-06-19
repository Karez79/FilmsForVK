import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../stores/movieStore';
import Filter from '../../components/Filter/Filter';
import MovieList from '../../components/MovieList/MovieList';
import './Home.css';

const Home: React.FC = observer(() => {
  useEffect(() => {
    console.log('Home component mounted');
    movieStore.fetchMovies();
    movieStore.fetchGenres();
  }, []);

  console.log('Movies state:', movieStore.movies);
  console.log('Genres state:', movieStore.genres);

  if (movieStore.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <Filter />
      <MovieList movies={movieStore.movies} />
    </div>
  );
});

export default Home;
