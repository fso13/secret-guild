import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Modal, Box, useMediaQuery, useTheme} from '@mui/material';

const GameCard = ({ game }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Ограничение текста до 100 символов
  const truncateDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <>
      {/* Карточка игры */}
      <Card onClick={handleOpen} sx={{ cursor: 'pointer', maxWidth: 300, width: '100%', margin: '0 auto' }}>
        {/* Квадратное изображение */}
        <Box sx={{ width: 300, height: 300, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={'/static/images/game/'+game.id+'.jpg'}
            alt={game.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {game.name}
          </Typography>
          {/* Описание с ограничением в 100 символов */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3, // Ограничение до 3 строк
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {truncateDescription(game.description)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Игроки: {game.minPlayers}-{game.maxPlayers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Время игры: {game.playTime}
          </Typography>
        </CardContent>
      </Card>

      {/* Модальное окно с полным описанием игры */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400, // Адаптивная ширина
            maxHeight: '90vh', // Максимальная высота
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: 'auto', // Прокрутка контента
          }}
        >
          <Typography variant="h5" gutterBottom>
            {game.name}
          </Typography>
          {/* Квадратное изображение в модальном окне */}
          <Box sx={{ width: 'auto', height: 400, mb: 2 }}>
            <img
              src={'/static/images/game/'+game.id+'.jpg'}
              alt={game.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
            />
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {game.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Игроки: {game.minPlayers}-{game.maxPlayers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Время игры: {game.playTime}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default GameCard;