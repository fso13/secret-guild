import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, CardMedia } from '@mui/material';
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
        const foundGame = data.find((p) => p.id === parseInt(gameId));
        setGame(foundGame);
      });
  }, [gameId]);

  if (!game) {
    return <Typography>Пост не найден</Typography>;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h6">{game.name}</Typography>
      <Box sx={{ width: '50%', height: '400px', objectFit: 'contain'}}>
          <CardMedia
            component="img"
            src={'/static/images/game/' + game.id + '.jpg'}
            alt={game.name}
            sx={{ width: '100%', height: '100%',objectFit: 'contain' }}
          />
        </Box>
      <Typography style={{ whiteSpace: "pre-wrap" }}>{game.description}</Typography>
      <Typography>Игроки: {game.minPlayers}-{game.maxPlayers}</Typography>
      <Typography>Время игры: {game.playTime}</Typography>

    </Container>
  );
};

export default GamePage;
