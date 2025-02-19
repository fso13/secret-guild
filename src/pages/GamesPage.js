import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import GameCard from '../components/GameCard';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [playerCount, setPlayerCount] = useState('');

  useEffect(() => {
    fetch('/data/games.json')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (playerCount === '' || (game.minPlayers <= playerCount && game.maxPlayers >= playerCount))
  );

  return (
    <div>
      <TextField
        label="Поиск по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TextField
        label="Количество игроков"
        type="number"
        value={playerCount}
        onChange={(e) => setPlayerCount(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredGames.map(game => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GamesPage;