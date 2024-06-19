export interface Movie {
    id: number;
    name: string;
    description: string;
    year: number;
    genres: string[];
    posterUrl?: string; // Возможно, правильное название свойства
    rating?: {
      kp: number; // Предполагаемое поле в объекте рейтинга
    };
    // добавьте другие поля по необходимости
  }
  
  export interface DetailedMovie {
    id: number;
    title: string;
    description: string;
    poster: string;
    rating: number;
    releaseDate: string;
    genres: string[];
  }
  
  export interface MovieFilters {
    ratingRange: [number, number];
    yearFrom: number;
    genres: string[];
  }
  
  export interface ApiResponse<T> {
    docs: T[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  }
  