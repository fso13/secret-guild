import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Добавляем Link для маршрутизации
import MenuIcon from '@mui/icons-material/Menu';
import GamesIcon from '@mui/icons-material/SportsEsports';
import PostsIcon from '@mui/icons-material/Article';
import StatsIcon from '@mui/icons-material/BarChart';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import AppIcon from '@mui/icons-material/Casino';
import ThemeToggle from './ThemeToggle'; // Компонент для переключения темы

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Пункты меню
  const menuItems = [
    { text: 'Игры', icon: <GamesIcon />, path: '/' },
    { text: 'Посты', icon: <PostsIcon />, path: '/posts' },
    { text: 'Статистика', icon: <StatsIcon />, path: '/statistics' },
    { text: 'Календарь', icon: <CalendarIcon />, path: '/calendar' },
  ];

  return (
    <>
      {/* Верхняя панель */}
      <AppBar position="static">
        <Toolbar>
          {/* Иконка меню для мобильной версии */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Иконка приложения и название сайта */}
          <AppIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Игровое приложение
          </Typography>
          {/* Пункты меню для десктопной версии */}
          {!isMobile && (
            <div style={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.text}
                  color="inherit"
                  aria-label={item.text}
                  component={Link} // Используем Link для маршрутизации
                  to={item.path}
                  sx={{ ml: 1 }}
                >
                  {item.icon}
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {item.text}
                  </Typography>
                </IconButton>
              ))}
            </div>
          )}
          {/* Переключатель темы */}
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Боковая панель для мобильной версии */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link} // Используем Link для маршрутизации
              to={item.path}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;