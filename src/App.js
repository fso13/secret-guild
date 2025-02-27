import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme';
import NavBar from './components/NavBar';
import GamesPage from './pages/GamesPage';
import GamePage from './pages/GamePage';
import PostsPage from './pages/PostsPage';
import StatisticsPage from './pages/StatisticsPage';
import CalendarPage from './pages/CalendarPage';
import PostPage from './pages/PostPage'; // Импортируем новую страницу

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<GamesPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/post/:postId" element={<PostPage />} /> {/* Новый маршрут */}
          <Route path="/game/:gameId" element={<GamePage />} /> {/* Новый маршрут */}

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;