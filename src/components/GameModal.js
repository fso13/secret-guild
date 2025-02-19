import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const GameModal = ({ game, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6">{game.name}</Typography>
        <img src={game.image} alt={game.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <Typography style={{ whiteSpace: "pre-wrap"}}>{game.description}</Typography>
        <Typography>Игроки: {game.minPlayers}-{game.maxPlayers}</Typography>
        <Typography>Время игры: {game.playTime}</Typography>
      </Box>
    </Modal>
  );
};

export default GameModal;