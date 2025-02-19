import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostPage = () => {
  const { postId } = useParams(); // Получаем postId из URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Загружаем данные поста
    fetch('/data/posts.json')
      .then((response) => response.json())
      .then((data) => {
        const foundPost = data.find((p) => p.id === parseInt(postId));
        setPost(foundPost);
      });
  }, [postId]);

  // Настройки для карусели
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!post) {
    return <Typography>Пост не найден</Typography>;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt: 4 }}>
      {/* Заголовок с датой */}
      <Typography variant="h4" gutterBottom>
        {post.date}
      </Typography>

      {/* Карусель медиа */}
      <Box sx={{ width: '100%', maxWidth: 600, height: 400, overflow: 'hidden', mb: 4 }}>
        <Slider {...settings}>
          {post.media.map((media, index) => (
            <div key={index}>
              <img
                src={media}
                alt={`Media ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
      </Box>

      {/* Описание поста */}
      <Typography style={{ whiteSpace: "pre-wrap"}} variant="body1" sx={{ mb: 2 }}>
        {post.description}
      </Typography>

      {/* Список игр */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Игры:
      </Typography>
      <Box sx={{ mb: 4 }}>
        {post.games.map((game, index) => (
          <Typography key={index} variant="body2">
            {game.name} ({game.plays} партий)
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default PostPage;