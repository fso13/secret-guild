import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'ru': require('date-fns/locale/ru'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/data/posts.json')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  
  const events = posts.map(post => ({
    title: `Игры: ${post.games.map(game => game.title).join(', ')}`,
    start: convertStringToDate(post.title),
    end: convertStringToDate(post.title),
  }));

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        messages={{
          today: 'Сегодня',
          previous: 'Назад',
          next: 'Вперед',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
        }}
      />
    </div>
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