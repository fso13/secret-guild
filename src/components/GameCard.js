import React from 'react';
import { Card, CardMedia, CardContent, Typography, useTheme,useMediaQuery } from '@mui/material';

const GameCard = ({ game, onClick }) => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card onClick={onClick} sx={{
      maxWidth: isMobile ? '100%' : 345,
      margin: 'auto',
      mb: 3,
      cursor: 'pointer',
    }}>
      {/* Квадратное изображение */}
      <CardMedia
        component="img"
        image={game.coverImage}
        alt={game.title}
        sx={{
          aspectRatio: '1 / 1', // Соотношение сторон 1:1 (квадрат)
          objectFit: 'cover', // Обрезаем изображение до ближайшей стороны
          width: '100%', // Занимает всю ширину карточки
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {game.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {game.shortDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Время игры: {game.playTime} минут
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Игроки: {game.players}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;