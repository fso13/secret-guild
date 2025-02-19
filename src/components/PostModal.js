import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostModal = ({ post, open, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!post) return null;
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6">{new Date(post.date).toLocaleDateString()}</Typography>
        <Slider {...settings}>
          {post.media.map((media, index) => (
            <div key={index}>
              <img src={media} alt={`Media ${index}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </div>
          ))}
        </Slider>
        <Typography style={{ whiteSpace: "pre-wrap"}}>{post.description}</Typography>
        <Typography>
          Игры: {post.games.map(game => `${game.name} (${game.plays} партий)`).join(', ')}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;