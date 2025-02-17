import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GamesPage from './pages/GamesPage';
import PostsPage from './pages/PostsPage';
import StatisticsPage from './pages/StatisticsPage';
import CalendarPage from './pages/CalendarPage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import draculaTheme from './theme';

const drawerWidth = 240;
const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm = 600px
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Список пунктов меню
  const menuItems = [
    { text: 'Игры', path: '/' },
    { text: 'Посты', path: '/posts' },
    { text: 'Статистика', path: '/statistics' },
    { text: 'Календарь', path: '/calendar' },
  ];

  // Боковое меню для мобильных устройств
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* Верхнее меню для десктопов */}
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Настольные игры
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.text}
                  variant="body1"
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Боковое меню для мобильных устройств */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Лучше для производительности на мобильных устройствах
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Высота AppBar
        }}
      >
        <Routes>
          <Route path="/" element={<GamesPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Box>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
     <ThemeProvider theme={draculaTheme}>
     <CssBaseline /> 
    <App />
    </ThemeProvider>
  </Router>
);
export default AppWrapper;