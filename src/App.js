import React from 'react';

import {Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import GamesPage from './pages/GamesPage';
import GamePage from './pages/GamePage';
import PostsPage from './pages/PostsPage';
import StatisticsPage from './pages/StatisticsPage';
import CalendarPage from './pages/CalendarPage';
import PostPage from './pages/PostPage'; // Импортируем новую страницу
import HomePage from './pages/HomePage'; // Импортируем новую страницу
import SuggestGamesPage from './pages/SuggestGamesPage'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/post/:postId" element={<PostPage />} /> {/* Новый маршрут */}
          <Route path="/game/:gameId" element={<GamePage />} /> {/* Новый маршрут */}
          <Route path="/game/:gameName" element={<GamePage />} />
          <Route path="/suggest" element={<SuggestGamesPage />} />
          </Routes>
    </div>
  );
};
export default App;