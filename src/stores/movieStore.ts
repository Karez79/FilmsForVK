import { makeAutoObservable } from 'mobx';
import { fetchMovies, fetchMovieDetails, fetchGenres } from '../utils/api';
import { DetailedMovie, MovieFilters, Movie } from '../types';

class MovieStore {
  movies: DetailedMovie[] = [];
  movieDetails: DetailedMovie | null = null;
  genres: string[] = [];
  page = 1;
  totalPages = 0;
  loading = false;
  filters: MovieFilters = {
    genres: [],
    ratingRange: [0, 10],
    yearFrom: 1990,
  };

  constructor() {
    makeAutoObservable(this);
    this.fetchGenres();
  }

  private adaptMovie(movie: Movie): DetailedMovie {
    return {
      id: movie.id,
      title: movie.name,
      description: movie.description,
      poster: movie.posterUrl || '',
      rating: movie.rating?.kp || 0,
      releaseDate: '', // Замените на правильное значение
      genres: movie.genres,
    };
  }

  fetchMovies = async () => {
    this.loading = true;
    try {
      console.log('Fetching movies with filters:', this.filters);
      const data = await fetchMovies(this.page, this.filters);
      this.movies = data.docs.map(this.adaptMovie);
      this.totalPages = data.pages;
      console.log('Movies fetched:', this.movies);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      this.loading = false;
    }
  };

  fetchMovieDetails = async (id: number) => {
    this.loading = true;
    try {
      const movie = await fetchMovieDetails(id);
      this.movieDetails = this.adaptMovie(movie);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    } finally {
      this.loading = false;
    }
  };

  fetchGenres = async () => {
    this.loading = true;
    try {
      console.log('Fetching genres...');
      const data = await fetchGenres();
      this.genres = data;
      console.log('Genres fetched:', this.genres);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    } finally {
      this.loading = false;
    }
  };

  setFilters = (filters: Partial<MovieFilters>) => {
    this.filters = { ...this.filters, ...filters };
    this.page = 1;
    this.fetchMovies();
  };

  setPage = (page: number) => {
    this.page = page;
    this.fetchMovies();
  };
}

export const movieStore = new MovieStore();
