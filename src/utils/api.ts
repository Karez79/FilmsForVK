import axios from 'axios';

const API_KEY = 'J6SSPTR-WQQ4M0H-M2XS055-5W62WR1';
const BASE_URL = 'https://api.kinopoisk.dev/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});

interface MovieFilters {
  ratingRange: [number, number];
  yearFrom: number;
  genres: string[];
}

interface ApiResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface Movie {
  id: number;
  name: string;
  description: string;
  year: number;
  genres: string[];
  // добавьте другие поля по необходимости
}

export const fetchMovies = async (page: number, filters: MovieFilters): Promise<ApiResponse<Movie>> => {
  try {
    const response = await api.get<ApiResponse<Movie>>('/movie', {
      params: {
        page,
        'rating.kp': `${filters.ratingRange[0]}-${filters.ratingRange[1]}`,
        year: filters.yearFrom,
        genres: filters.genres.length > 0 ? filters.genres.join(',') : null,
      },
    });
    console.log('API fetchMovies response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to fetch movies:', error.response.data);
    } else {
      console.error('Failed to fetch movies:', error);
    }
    throw error;
  }
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  try {
    const response = await api.get<Movie>(`/movie/${id}`);
    console.log('API fetchMovieDetails response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to fetch movie details:', error.response.data);
    } else {
      console.error('Failed to fetch movie details:', error);
    }
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<ApiResponse<Movie>> => {
  try {
    const response = await api.get<ApiResponse<Movie>>('/movie', {
      params: { query },
    });
    console.log('API searchMovies response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to search movies:', error.response.data);
    } else {
      console.error('Failed to search movies:', error);
    }
    throw error;
  }
};

export const fetchRandomMovie = async (): Promise<Movie> => {
  try {
    const response = await api.get<Movie>('/movie/random');
    console.log('API fetchRandomMovie response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to fetch random movie:', error.response.data);
    } else {
      console.error('Failed to fetch random movie:', error);
    }
    throw error;
  }
};

// export const fetchMovieAwards = async (id: number): Promise<any> => {
//   try {
//     const response = await api.get<any>('/movie/awards', {
//       params: { id },
//     });
//     console.log('API fetchMovieAwards response:', response.data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.error('Failed to fetch movie awards:', error.response.data);
//     } else {
//       console.error('Failed to fetch movie awards:', error);
//     }
//     throw error;
//   }
// };

export const fetchPossibleValues = async (field: string): Promise<any> => {
  try {
    console.log(`Calling API: fetchPossibleValues for field: ${field}`);
    const response = await api.get<any>('/movie/possible-values-by-field', {
      params: { field },
    });
    console.log('API fetchPossibleValues response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch possible values:', error.response?.data || error.message);
    } else {
      console.error('Failed to fetch possible values:', error);
    }
    throw error;
  }
};

export const fetchGenres = async (): Promise<string[]> => {
  try {
    const data = await fetchPossibleValues('genres.name');
    console.log('API fetchGenres response:', data);
    return data.map((genre: { name: string }) => genre.name);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch genres:', error.response?.data || error.message);
    } else {
      console.error('Failed to fetch genres:', error);
    }
    throw error;
  }
};

// Тестирование функций
(async () => {
  try {
    // Test fetchMovies
    const movies = await fetchMovies(1, { ratingRange: [0, 10], yearFrom: 1990, genres: [] });
    console.log('Fetched movies:', movies);

    // Test fetchMovieDetails
    const movieDetails = await fetchMovieDetails(8124);
    console.log('Fetched movie details:', movieDetails);

    // Test searchMovies
    const searchResults = await searchMovies('Home Alone');
    console.log('Search results:', searchResults);

    // Test fetchRandomMovie
    const randomMovie = await fetchRandomMovie();
    console.log('Fetched random movie:', randomMovie);

    // // Test fetchMovieAwards
    // const movieAwards = await fetchMovieAwards(8124);
    // console.log('Fetched movie awards:', movieAwards);

    // Test fetchGenres
    const genres = await fetchGenres();
    console.log('Fetched genres:', genres);
  } catch (error) {
    console.error('Error during API tests:', error);
  }
})();
