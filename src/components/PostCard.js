import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostCard = ({ post }) => {
  // Настройки для карусели
  const settings = {
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
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Карусель медиа */}
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Slider {...settings}>
          {post.media.map((media, index) => (
            <div key={index}>
              <img
                src={media}
                alt={`Media ${index}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
      </Box>

      {/* Контент по центру */}
      <CardContent sx={{}}>
        <Typography gutterBottom variant="h5" component="div">
          {post.date}
        </Typography>
        <Typography style={{ whiteSpace: "pre-wrap"}} variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Игры: {post.games.map((game) => game.name).join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;