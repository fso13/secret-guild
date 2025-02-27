import React, { useState, useEffect } from 'react';
import { Grid2, Container } from '@mui/material';
import PostCard from '../components/PostCard';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/data/posts.json')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Grid2 container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid2 item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default PostsPage;