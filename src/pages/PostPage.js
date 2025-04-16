import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Link  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Импортируем Link для маршрутизации
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCarousel from '../components/ImageCarousel';

const PostPage = () => {
  const { postId } = useParams(); // Получаем postId из URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Загружаем данные поста
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((data) => {
        const foundPost = data.find((p) => p.id === parseInt(postId));
        setPost(foundPost);
      });
  }, [postId]);

  if (!post) {
    return <Typography>Пост не найден</Typography>;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {/* Динамические метатеги для Open Graph */}
      {/* Заголовок с датой */}
      <Typography variant="h4" gutterBottom>
      {convertStringToDate(post.title).toLocaleDateString('ru')}
      </Typography>

      {/* Карусель медиа */}
      <ImageCarousel 
        images={post.media} 
        height={400}
        width="100%"/>
        

     {/* Список игр */}
     <Typography variant="body2" color="text.secondary">
            Игры: {post.games.map((game, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={`/game/${game.title}`} // Ссылка на страницу игры
                onClick={(e) => e.stopPropagation()} // Останавливаем всплытие события
                sx={{ marginRight: 1 }}
              >
                 {game.title + '(' + game.count +')'}
              </Link>
            ))}
          </Typography>

      {/* Описание поста */}
      <Typography style={{ whiteSpace: "pre-wrap"}}  variant="body1" sx={{ mb: 2 }}>
        {post.description}
      </Typography>

    </Container>
  );
};

export default PostPage;


function convertStringToDate(dateString) {
  // Разбиваем строку по разделителю "."
  const parts = dateString.split('.');

  // Проверяем, что у нас есть три части: день, месяц и год
  if (parts.length !== 3) {
      throw new Error('Неверный формат даты. Ожидается "ДД.ММ.ГГГГ".');
  }

  // Извлекаем день, месяц и год
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Месяцы начинаются с 0
  const year = parseInt(parts[2], 10);

  // Создаем объект Date
  return new Date(year, month, day);
}