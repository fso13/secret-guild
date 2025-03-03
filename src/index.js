import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Импортируем BrowserRouter
import App from './App'; // Основной компонент приложения
import { ThemeProvider } from './theme'; // Провайдер темы (если используется)
import { CssBaseline } from '@mui/material';

// Основной рендер приложения
ReactDOM.render(
  <React.StrictMode>
    {/* Используем BrowserRouter с basename */}
    <BrowserRouter basename="/secret-guild">
      {/* Провайдер темы (если используется) */}
      <ThemeProvider>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // Рендерим в элемент с id="root"
);