import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PostCard from '../components/PostCard';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Grid sx={{ py: 4 }} container spacing={3} justifyContent="center">
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>

  );
};

export default PostsPage;