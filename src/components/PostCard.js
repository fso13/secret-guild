import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import PostModal from './PostModal';

const PostCard = ({ post, games }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Функция для получения названия игры по ID
  const getGameTitle = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    return game ? game.title : `Игра #${gameId}`;
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: isMobile ? '100%' : 345,
          margin: 'auto',
          mb: 3,
          cursor: 'pointer',
        }}
        onClick={handleOpenModal}
      >
        {/* Медиа (фото/видео) */}
        {post.media.length > 0 && (
          <CardMedia
            component={post.media[0].endsWith('.mp4') ? 'video' : 'img'}
            height={isMobile ? 200 : 140}
            image={post.media[0]}
            alt="Media"
            controls={post.media[0].endsWith('.mp4')}
            sx={{ objectFit: 'cover' }}
          />
        )}

        <CardContent>
          {/* Дата игры */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(post.date).toLocaleDateString()}
          </Typography>

          {/* Описание партии */}
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            {post.description}
          </Typography>

          {/* Список игр */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {post.games.map((game, index) => (
              <Chip
                key={index}
                avatar={<Avatar sx={{ bgcolor: red[500] }}>{game.id}</Avatar>}
                label={`${getGameTitle(game.id)} (${game.playCount} партий)`}
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Модальное окно */}
      <PostModal post={post} games={games} open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PostCard;