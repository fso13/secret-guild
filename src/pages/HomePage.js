import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Link  } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const HomePage = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);


  
  // Настройки для карусели
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>

      {/* Описание поста */}
      <Typography variant="body1" sx={{ mb: 2 }} align='inherit'>
        Сайт группы не без талантливых людей, которые любят играть/создавать/проводить настольные игры.
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }} align='inherit'>
        По вопросом и предложениям обращаться на почту <Link href="mailto:secret@guild-13.ru">secret@guild-13.ru</Link>
      </Typography>
      {/* Карусель медиа */}
      <Box sx={{ width: '100%', maxWidth: 'auto', height: 'auto', overflow: 'hidden', mb: 4 }}>
        <Slider {...settings}>
          {posts.flatMap((post) => (post.media))
           .map((media, index) => (
              <div key={index}>
                <img
                  src={`${process.env.PUBLIC_URL}` + media}
                  alt={`Media ${index}`}
                  style={{ width: 400, height: 400, objectFit: 'cover' }}
                />
              </div>
            ))
          }
        </Slider>
      </Box>



    </Container>
  );
};

export default HomePage;