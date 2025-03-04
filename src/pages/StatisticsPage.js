import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StatisticsPage = () => {
  const [games, setGamesData] = useState([]);
  const theme = useTheme(); // Получаем текущую тему

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((posts) => {
        const playsCount = {};

        posts.forEach((post) => {
          post.games.forEach((game) => {
            if (playsCount[game.title]) {
              playsCount[game.title] += game.count;
            } else {
              playsCount[game.title] = game.count;
            }
          });
        });

        const formattedData = Object.keys(playsCount).map((gameName) => ({
          name: gameName,
          plays: playsCount[gameName],
        }));

        setGamesData(formattedData);
      });
  }, []);

  // Кастомный компонент для столбцов
  const CustomBar = (props) => {
    const { x, y, width, height, name } = props;

    return (
      <Link
        component={RouterLink}
        to={`/game/${name}`}
        sx={{ color: 'inherit', textDecoration: 'none' }}
      >
        <g>
          <rect x={x} y={y} width={width} height={height} fill={theme.palette.info.main} />
          <text
            x={x}
            y={y + height / 2 + 5}
            dy={0}
            textAnchor="start"
            fill={theme.palette.text.primary}
            fontSize={16}
          >
            {name}
          </text>
        </g>
      </Link>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Статистика
      </Typography>

      <Box sx={{ width: '100%', height: 2500 }}>
        <ResponsiveContainer>
          <BarChart
            data={games}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={0}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="plays"
              name="Количество партий"
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StatisticsPage;