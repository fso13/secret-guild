import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Link  } from '@mui/material';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom'; // Импортируем Link для маршрутизации
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet';

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

  // Настройки для карусели
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Показываем стрелки только если больше одного элемента
  };

  if (!post) {
    return <Typography>Пост не найден</Typography>;
  }

  

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {/* Динамические метатеги для Open Graph */}
      <Helmet>
        <title>{post.title} - Secret Guild</title>
        <meta property="og:title" content={`${post.title} - Secret Guild`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.media[0]} />
        <meta property="og:url" content={`https://fso13.github.io/secret-guild/post/${postId}`} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Secret Guild`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.media[0]} />
      </Helmet>
      {/* Заголовок с датой */}
      <Typography variant="h4" gutterBottom>
      {convertStringToDate(post.title).toLocaleDateString('ru')}
      </Typography>

      {/* Карусель медиа */}
      <Box sx={{ width: '100%', maxWidth: 600, height: 400, borderRadius: 8, overflow: 'hidden', mb: 4 }}>
        <Slider {...settings}>
          {post.media.map((media, index) => (
            <div key={index}>
              <img
                src={`${process.env.PUBLIC_URL}` + media}
                alt={`Media ${index}`}
                style={{ width: '100%', height: '100%', borderRadius: 8, objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
      </Box>

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