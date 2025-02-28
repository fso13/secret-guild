import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, CardMedia, Chip, Avatar } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GamePage = () => {
  const { gameId } = useParams(); // Получаем postId из URL
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Загружаем данные поста
    fetch('/data/games.json')
      .then((response) => response.json())
      .then((data) => {
        const foundGame = data.find((p) => p.name === gameId || p.id === parseInt(gameId));
        setGame(foundGame);
      });
  }, [gameId]);

  if (!game) {
    return <Typography>Пост не найден</Typography>;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h6">{game.name}</Typography>

      <Box sx={{ width: '50%', height: '400px', objectFit: 'contain', position: 'relative' }}>
        <CardMedia
          component="img"
          src={'/static/images/game/' + game.id + '.jpg'}
          alt={game.name}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />

        {/* Метка "Дополнение" */}
        {game.isExtension && (
          <Chip
            label="Дополнение"
            color="success"
            size="small"
            sx={{ position: 'absolute', top: 10, right: 10 }}
          />
        )}
      </Box>

      <Typography style={{ whiteSpace: "pre-wrap" }}>{game.description}</Typography>
      <Typography>Игроки: {game.minPlayers}-{game.maxPlayers}</Typography>
      <Typography>Время игры: {game.playTime}</Typography>
      {/* Иконка владельца */}
      {game.owner && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={game.owner}
            alt="Владелец"
            sx={{ width: 50, height: 50, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            Владелец
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default GamePage;
