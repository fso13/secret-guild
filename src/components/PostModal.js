import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CloseIcon from '@mui/icons-material/Close';

const PostModal = ({ post, games, open, onClose }) => {
  // Настройки для карусели
  const settings = {
    dots: post.media.length > 1, // Показываем точки только если больше одного элемента
    infinite: false, // Отключаем бесконечную прокрутку
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: post.media.length > 1, // Показываем стрелки только если больше одного элемента
  };

  // Функция для получения названия игры по ID
  const getGameTitle = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    return game ? game.title : `Игра #${gameId}`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Кнопка закрытия */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Карусель с медиа */}
        {post.media.length > 0 ? (
          <Slider {...settings}>
            {post.media.map((mediaUrl, index) => (
              <div key={index}>
                {mediaUrl.endsWith('.mp4') ? (
                  <video controls src={mediaUrl} style={{ width: '100%', borderRadius: 8 }} />
                ) : (
                  <img src={mediaUrl} alt={`Media ${index}`} style={{ width: '100%', borderRadius: 8 }} />
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
            Медиа отсутствуют.
          </Typography>
        )}

        {/* Описание поста */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          {new Date(post.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {post.description}
        </Typography>

        {/* Список игр */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Игры:</Typography>
          <List>
            {post.games.map((game, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={getGameTitle(game.id)}
                  secondary={`Сыграно партий: ${game.playCount}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;