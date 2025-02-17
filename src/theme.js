import { createTheme } from '@mui/material/styles';

// Цвета Dracula
const draculaColors = {
  background: '#282a36',
  currentLine: '#44475a',
  foreground: '#f8f8f2',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};

// Создаем тему Dracula
const draculaTheme = createTheme({
  palette: {
    mode: 'dark', // Темная тема
    primary: {
      main: draculaColors.purple, // Основной цвет (акценты)
    },
    secondary: {
      main: draculaColors.pink, // Вторичный цвет (акценты)
    },
    background: {
      default: draculaColors.background, // Фон по умолчанию
      paper: draculaColors.currentLine, // Фон для карточек и панелей
    },
    text: {
      primary: draculaColors.foreground, // Основной текст
      secondary: draculaColors.comment, // Вторичный текст (например, подписи)
    },
    error: {
      main: draculaColors.red, // Цвет для ошибок
    },
    warning: {
      main: draculaColors.orange, // Цвет для предупреждений
    },
    info: {
      main: draculaColors.cyan, // Цвет для информации
    },
    success: {
      main: draculaColors.green, // Цвет для успешных действий
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Шрифт по умолчанию
    h1: {
      color: draculaColors.purple, // Заголовки
    },
    h2: {
      color: draculaColors.purple,
    },
    h3: {
      color: draculaColors.purple,
    },
    h4: {
      color: draculaColors.purple,
    },
    h5: {
      color: draculaColors.purple,
    },
    h6: {
      color: draculaColors.purple,
    },
    body1: {
      color: draculaColors.foreground, // Основной текст
    },
    body2: {
      color: draculaColors.comment, // Вторичный текст
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5, // Скругление углов кнопок
          textTransform: 'none', // Отключаем автоматическое преобразование текста в верхний регистр
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Скругление углов карточек
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Тень для карточек
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
});

export default draculaTheme;