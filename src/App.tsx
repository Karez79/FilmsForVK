import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import FavoritesPage from './routes/FavoritesPage/FavoritesPage';
import MoviePage from './routes/MoviePage/MoviePage';
import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
