import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Link  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Импортируем Link для маршрутизации
const StatisticsPage = () => {
  const [games, setGamesData] = useState([]);

  useEffect(() => {
    // Загружаем данные постов
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((posts) => {
        // Создаем объект для подсчета количества партий по играм
        const playsCount = {};

        // Проходим по всем постам и считаем партии
        posts.forEach((post) => {
          post.games.forEach((game) => {
            if (playsCount[game.title]) {
              playsCount[game.title] += game.count;
            } else {
              playsCount[game.title] = game.count;
            }
          });
        });

        // Преобразуем объект в массив для графика
        const formattedData = Object.keys(playsCount).map((gameName) => ({
          name: gameName,
          plays: playsCount[gameName],
        }));

        setGamesData(formattedData);
      });
  }, []);


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Статистика
      </Typography>

      {/* График */}
      <Box sx={{ width: '100%', height: 2500 }}>
        <ResponsiveContainer>
          <BarChart
            data={games}
            layout="vertical" // Вертикальный график
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" /> {/* Ось X: количество партий */}
            {/* <YAxis type="category" dataKey="name" width={150} /> Ось Y: названия игр */}
            <YAxis
              type="category"
              dataKey="name"
              width={250}
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <Link
                    component={RouterLink}
                    to={`/game/${payload.value}`} // Ссылка на страницу игры
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <text  x={x} y={y} dy={5} textAnchor="end" fill="currentColor">
                      {payload.value}
                    </text>
                  </Link>
                );
              }}
            /> {/* Ось Y: названия игр */}
            <Tooltip />
            <Legend />
            <Bar dataKey="plays" fill="#8884d8" name={'Колличество партий'} /> {/* Столбцы для количества партий */}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StatisticsPage;