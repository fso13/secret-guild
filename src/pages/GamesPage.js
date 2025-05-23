import React, { useState, useEffect } from 'react';
import { Grid, TextField, Slider, Box, Typography } from '@mui/material';
import GameCard from '../components/GameCard';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [playerCount, setPlayerCount] = useState([-1, -1]); // Диапазон игроков

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/games.json`)
      .then((response) => response.json())
      .then((data) => setGames(data.filter((g) => g.owner)));
  }, []);

  // Фильтрация игр
  const filteredGames = games.filter((game) => {
    const matchesSearchTerm = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlayerCount =
      ((game.minPlayers <= playerCount[0] && game.maxPlayers >= playerCount[1]) || playerCount[0] < 0);
    return matchesSearchTerm && matchesPlayerCount;
  });

  return (
    <Box sx={{ py: 4 }}>
      {/* Поиск по названию и количеству игроков */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
        {/* Поле поиска по названию */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Поиск по названию"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Слайдер для выбора количества игроков */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ px: 2 }}>
            <Typography gutterBottom>Количество игроков</Typography>
            <Slider
              value={playerCount}
              onChange={(_, newValue) => setPlayerCount(newValue)}
              valueLabelDisplay="auto"
              min={1}
              max={10}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Сетка карточек игр */}
      <Grid container spacing={3} justifyContent="center">
        {filteredGames.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default GamesPage;