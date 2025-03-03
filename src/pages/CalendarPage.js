import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/ru';
import { Box, useTheme } from '@mui/material';
import { ThemeContext } from '../theme';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)


const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // По умолчанию вид "месяц"
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Загружаем данные постов
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((data) => {
        // Преобразуем данные в формат, подходящий для календаря
        const formattedEvents = data
          .filter((post) => convertStringToDate(post.title)) // Фильтруем посты с корректной датой
          .flatMap((post) =>
            post.games.map((game) => ({
              title: game.title,
              start: convertStringToDate(post.title),
              end: convertStringToDate(post.title),
              allDay: true,
            })));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  // Стили календаря в зависимости от темы
  const calendarStyle = {
    height: '100vh',
    backgroundColor: darkMode ? theme.palette.background.default : '#fff',
    color: darkMode ? theme.palette.text.primary : '#000',
  };

  return (
    <Box sx={calendarStyle}>
      <Calendar
        localizer={localizer}
        events={events}
        view={view}
        onView={setView}
        views={{ month: true, week: false, day: false }} // Доступные виды
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        messages={{
          today: 'Сегодня',
          previous: 'Назад',
          next: 'Вперед',
          month: 'Месяц',
        }}
        style={{ height: '100%' }}
      />
    </Box>
  );
};

export default CalendarPage;


function convertStringToDate(dateString) {
  // Разбиваем строку по разделителю "."
  const parts = dateString.split('.');

  // Проверяем, что у нас есть три части: день, месяц и год
  if (parts.length !== 3) {
    throw new Error('Неверный формат даты. Ожидается "ДД.ММ.ГГГГ".');
  }

  // Извлекаем день, месяц и год
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Месяцы начинаются с 0
  const year = parseInt(parts[2], 10);

  // Создаем объект Date
  return new Date(year, month, day);
}