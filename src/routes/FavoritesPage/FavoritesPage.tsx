import React from 'react';
import { observer } from 'mobx-react-lite';
import { favoriteStore } from '../../stores/favoriteStore';
import MovieCard from '../../components/MovieCard/MovieCard';
import './FavoritesPage.css';

const FavoritesPage: React.FC = observer(() => {
  return (
    <div className="favoritesPage">
      <h1>Favorites</h1>
      <div className="favoritesPage__list">
        {favoriteStore.favorites.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
});

export default FavoritesPage;
