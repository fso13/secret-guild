import React, { useState, useEffect } from 'react';
import { Grid2 } from '@mui/material';
import PostCard from '../components/PostCard';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Загружаем данные о постах и играх
    Promise.all([
      fetch('/data/posts.json').then((response) => response.json()),
      fetch('/data/games.json').then((response) => response.json()),
    ]).then(([postsData, gamesData]) => {
      setPosts(postsData);
      setGames(gamesData);
    });
  }, []);

  return (
    <Grid2 container spacing={3}>
      {posts.map((post) => (
        <Grid2 item key={post.id} xs={12} sm={6} md={4}>
          <PostCard post={post} games={games} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PostsPage;