import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PostCard from '../components/PostCard';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/data/posts.json')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PostsPage;