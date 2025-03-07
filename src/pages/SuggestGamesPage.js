import React, { useState, useEffect } from 'react';
import { Grid2, TextField, Box, Button } from '@mui/material';
import GameCard from '../components/GameCard';

const SuggestGamesPage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [totalDuration, setTotalDuration] = useState(2); // Общая продолжительность в часах
  const [playerCount, setPlayerCount] = useState(2); // Количество игроков
  const [numberOfGames, setNumberOfGames] = useState(3); // Количество игр

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/games.json`)
      .then((response) => response.json())
      .then((data) => setGames(data.filter((g) => g.owner && !g.isExtension)));
  }, []);

  // Функция для извлечения минимального и максимального времени игры из строки playTime
  const parsePlayTime = (playTime) => {
    // Удаляем " мин" из строки
    const timeString = playTime.replace(' мин', '');
  
    // Проверяем, содержит ли строка диапазон (например, "90 - 120")
    if (timeString.includes(' - ')) {
      const [minTime, maxTime] = timeString.split(' - ').map((time) => parseInt(time, 10));
      return { minTime, maxTime };
    } else {
      // Если строка содержит одиночное значение (например, "10")
      const time = parseInt(timeString, 10);
      return { minTime: time, maxTime: time };
    }
  };

  const handleSuggestGames = () => {
    // Фильтрация игр по количеству игроков
    const filteredByPlayers = games.filter(
      (game) => game.minPlayers <= playerCount && game.maxPlayers >= playerCount
    );

    // Фильтрация игр по продолжительности
    const filteredByDuration = filteredByPlayers.filter((game) => {
      const { maxTime } = parsePlayTime(game.playTime);
      return maxTime <= totalDuration * 60; // Игры, которые укладываются в общее время
    });

    // Сортировка игр по продолжительности (по минимальному времени)
    const sortedByDuration = filteredByDuration.sort((a, b) => {
      const { minTime: minTimeA } = parsePlayTime(a.playTime);
      const { minTime: minTimeB } = parsePlayTime(b.playTime);
      return minTimeA - minTimeB;
    });

    // Подбор игр, суммарная продолжительность которых близка к заданной
    let accumulatedDuration = 0;
    const suggestedGames = [];
    const usedGameIds = new Set(); // Для отслеживания уже использованных игр

    while (suggestedGames.length < numberOfGames && sortedByDuration.length > 0) {
      // Выбираем случайную игру из оставшихся
      const randomIndex = Math.floor(Math.random() * sortedByDuration.length);
      const game = sortedByDuration[randomIndex];

      // Убедимся, что игра не была использована ранее
      if (!usedGameIds.has(game.id)) {
        const { minTime, maxTime } = parsePlayTime(game.playTime);
        const averageTime = (minTime + maxTime) / 2; // Используем среднее время для подбора

        if (accumulatedDuration + averageTime <= totalDuration * 60) {
          suggestedGames.push(game);
          accumulatedDuration += averageTime;
          usedGameIds.add(game.id); // Добавляем игру в список использованных
        }
      }

      // Удаляем игру из списка, чтобы она не выбиралась снова
      sortedByDuration.splice(randomIndex, 1);
    }

    setFilteredGames(suggestedGames);
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Форма для ввода параметров */}
      <Grid2 container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
        {/* Поле для ввода общей продолжительности */}
        <Grid2 item xs={12} sm={4}>
          <TextField
            label="Общая продолжительность (часы)"
            type="number"
            value={totalDuration}
            onChange={(e) => setTotalDuration(parseInt(e.target.value, 10))}
            fullWidth
            inputProps={{ min: 1 }}
          />
        </Grid2>

        {/* Поле для ввода количества игроков */}
        <Grid2 item xs={12} sm={4}>
          <TextField
            label="Количество игроков"
            type="number"
            value={playerCount}
            onChange={(e) => setPlayerCount(parseInt(e.target.value, 10))}
            fullWidth
            inputProps={{ min: 1 }}
          />
        </Grid2>

        {/* Поле для ввода количества игр */}
        <Grid2 item xs={12} sm={4}>
          <TextField
            label="Количество игр"
            type="number"
            value={numberOfGames}
            onChange={(e) => setNumberOfGames(parseInt(e.target.value, 10))}
            fullWidth
            inputProps={{ min: 1 }}
          />
        </Grid2>
      </Grid2>

      {/* Кнопка для подбора игр */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button variant="contained" onClick={handleSuggestGames}>
          Подобрать игры
        </Button>
      </Box>

      {/* Сетка карточек игр */}
      <Grid2 container spacing={3} justifyContent="center">
        {filteredGames.map((game) => (
          <Grid2 item key={game.id} xs={12} sm={6} md={4}>
            <GameCard game={game} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default SuggestGamesPage;