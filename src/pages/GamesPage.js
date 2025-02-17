import React, { useState, useEffect } from 'react';
import { TextField, Grid2, Card, CardMedia, CardContent, Typography, Modal, Box } from '@mui/material';
import GameCard from '../components/GameCard';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchPlayers, setSearchPlayers] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch('/data/games.json')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesTitle = game.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesPlayers = game.players.includes(searchPlayers);
    return matchesTitle && matchesPlayers;
  });

  return (
    <div>
      <TextField
        label="Поиск по названию"
        variant="outlined"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        sx={{ mb: 2, mr: 2 }}
      />
      <TextField
        label="Поиск по количеству игроков"
        variant="outlined"
        value={searchPlayers}
        onChange={(e) => setSearchPlayers(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Grid2 container spacing={3}>
        {filteredGames.map((game) => (
          <Grid2 item key={game.id} xs={12} sm={6} md={4}>
            <GameCard game={game} onClick={() => setSelectedGame(game)} />
          </Grid2>
        ))}
      </Grid2>
      <Modal open={Boolean(selectedGame)} onClose={() => setSelectedGame(null)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            {selectedGame?.title}
          </Typography>
          <Typography sx={{ mt: 2 }}>{selectedGame?.description}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default GamesPage;