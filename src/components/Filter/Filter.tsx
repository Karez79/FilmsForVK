import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../stores/movieStore';
import './Filter.css';

const Filter: React.FC = observer(() => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [yearFrom, setYearFrom] = useState(1990);

  useEffect(() => {
    movieStore.fetchGenres();
  }, []);

  const applyFilters = () => {
    movieStore.setFilters({ genres: selectedGenres, ratingRange, yearFrom });
  };

  return (
    <div className="filter">
      <div className="filter__group">
        <label htmlFor="genres">Genres:</label>
        <select
          id="genres"
          multiple
          value={selectedGenres}
          onChange={(e) => setSelectedGenres(Array.from(e.target.selectedOptions, option => option.value))}
          className="filter__select"
        >
          {movieStore.genres.map((genre: any) => (
            <option key={genre.name} value={genre.name}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className="filter__group">
        <label htmlFor="rating">Rating:</label>
        <input
          type="range"
          id="rating"
          min="0"
          max="10"
          value={ratingRange[1]}
          onChange={(e) => setRatingRange([0, +e.target.value])}
          className="filter__range"
        />
        <span>{ratingRange[0]} - {ratingRange[1]}</span>
      </div>
      <div className="filter__group">
        <label htmlFor="year">Year from:</label>
        <input
          type="number"
          id="year"
          min="1990"
          value={yearFrom}
          onChange={(e) => setYearFrom(+e.target.value)}
          className="filter__input"
        />
      </div>
      <button onClick={applyFilters} className="filter__button">Apply Filters</button>
    </div>
  );
});

export default Filter;
