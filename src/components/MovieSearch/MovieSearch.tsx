import React, { useState } from 'react';
import { searchMovies } from '../../utils/api';
import './MovieSearch.css';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const data = await searchMovies(query);
    setResults(data.docs);
  };

  return (
    <div className="movieSearch">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((movie) => (
          <div key={movie.id} className="resultItem">
            <img src={movie.poster.previewUrl} alt={movie.name} />
            <h3>{movie.name}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
