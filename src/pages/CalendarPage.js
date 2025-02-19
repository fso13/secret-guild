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
    title: `Игры: ${post.games.map(game => game.name).join(', ')}`,
    start: new Date(post.date),
    end: new Date(post.date),
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