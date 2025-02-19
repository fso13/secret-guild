import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const GameCard = ({ game, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={game.image}
        alt={game.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {game.name}
        </Typography>
        <Typography style={{ whiteSpace: "pre-wrap"}} variant="body2" color="text.secondary">
          {game.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Игроки: {game.minPlayers}-{game.maxPlayers}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Время игры: {game.playTime}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;