import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/posts.json').then((response) => response.json()),
      fetch('/data/games.json').then((response) => response.json()),
    ]).then(([postsData, gamesData]) => {
      // Считаем общее количество партий для каждой игры
      const stats = postsData.reduce((acc, post) => {
        post.games.forEach((game) => {
          const gameTitle = gamesData.find((g) => g.id === game.id)?.title || `Игра #${game.id}`;
          if (!acc[game.id]) acc[game.id] = { totalPlayCount: 0, title: gameTitle };
          acc[game.id].totalPlayCount += game.playCount;
        });
        return acc;
      }, {});

      // Преобразуем статистику в массив для графика
      const statisticsData = Object.values(stats);
      setStatistics(statisticsData);
    });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Статистика игр
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={statistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalPlayCount" fill="#8884d8" name="Количество партий" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsPage;