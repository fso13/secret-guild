import React from 'react';
import { Card, CardContent, Typography, Box ,CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostCard = ({ post }) => {
  
  // Настройки для карусели
  const settings = {
     accessibility: true,
    lazyLoad: "ondemand",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card
      component={Link}
      to={`/post/${post.id}`}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 300, // Ограничиваем ширину карточки
        width: '100%', // Занимает всю доступную ширину, но не более 300px
        margin: '0 auto', // Центрируем карточку
      }}
    >
      {/* Карусель медиа */}
      <Box sx={{ width: '100%', height: 200, overflow: 'hidden' }}>
      {post.media && (
        <Slider {...settings}>
          {post.media.map((mediaUrl, index) => (
            <div key={index}>
              {mediaUrl.endsWith('.mp4') ? (
                <video
                  controls
                  src={mediaUrl}
                  style={{ width: '100%', height: 300, borderRadius: 8, objectFit: 'cover' }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={mediaUrl}
                  alt={`Media ${index}`}
                  sx={{
                    width: '100%',
                    height: 300, // Фиксированная высота
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
              )}
            </div>
          ))}
        </Slider>
      )}
      </Box>

      {/* Контент по центру */}
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography gutterBottom variant="h6" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Игры: {post.games.map((game) => game.title).join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;