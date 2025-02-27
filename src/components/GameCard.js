import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
 
  // Ограничение текста до 100 символов
  const truncateDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <>
      {/* Карточка игры */}
      <Card component={Link}
        to={`/game/${game.id}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 300, // Ограничиваем ширину карточки
          width: '100%', // Занимает всю доступную ширину, но не более 300px
          margin: '0 auto', // Центрируем карточку
        }}>
        {/* Квадратное изображение */}
        <Box sx={{ width: 300, height: 300, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            src={'/static/images/game/' + game.id + '.jpg'}
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

      
    </>
  );
};

export default GameCard;