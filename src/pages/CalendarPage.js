import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Typography, Modal, Box, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedDatePosts, setSelectedDatePosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Загрузка данных из posts.json и games.json
  useEffect(() => {
    Promise.all([
      fetch('/data/posts.json').then((response) => response.json()),
      fetch('/data/games.json').then((response) => response.json()),
    ]).then(([postsData, gamesData]) => {
      setPosts(postsData);
      setGames(gamesData);

      // Преобразуем посты в события для календаря
      const formattedEvents = postsData.map((post) => ({
        title: `Игры: ${post.games.map((game) => {
          const gameTitle = gamesData.find((g) => g.id === game.id)?.title || `Игра #${game.id}`;
          return `${gameTitle} (${game.playCount} партий)`;
        }).join(', ')}`,
        start: new Date(post.date),
        end: new Date(post.date),
      }));
      setEvents(formattedEvents);
    });
  }, []);

  // Обработчик клика по событию в календаре
  const handleSelectEvent = (event) => {
    const postsForDate = posts.filter(
      (post) => new Date(post.date).toDateString() === event.start.toDateString()
    );
    setSelectedDatePosts(postsForDate);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Функция для получения названия игры по ID
  const getGameTitle = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    return game ? game.title : `Игра #${gameId}`;
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom>
        Календарь игр
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: isMobile ? 300 : 500 }}
        views={['month', 'week', 'day']}
        onSelectEvent={handleSelectEvent}
        messages={{
          today: 'Сегодня',
          previous: 'Назад',
          next: 'Вперед',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
        }}
      />

      {/* Модальное окно с постами */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Кнопка закрытия */}
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {/* Список постов */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Посты за выбранную дату
          </Typography>
          <List>
            {selectedDatePosts.map((post) => (
              <ListItem key={post.id} sx={{ borderBottom: '1px solid #eee' }}>
                <ListItemText
                  primary={post.description}
                  secondary={`Игры: ${post.games.map((game) => `${getGameTitle(game.id)} (${game.playCount} партий)`).join(', ')}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarPage;