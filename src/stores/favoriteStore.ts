import { makeAutoObservable } from 'mobx';

class FavoriteStore {
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite = (movie: any) => {
    this.favorites.push(movie);
    this.saveFavorites();
  };

  removeFavorite = (id: string) => {
    this.favorites = this.favorites.filter((movie: any) => movie.id !== id);
    this.saveFavorites();
  };

  saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  };
}

export const favoriteStore = new FavoriteStore();
