import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { grey } from '@mui/material/colors';

const ImageCarousel = ({
  images,
  height = 400,
  width = '100%',
  visibleCount = 1,
  gap = 16
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (visibleCount > 1) {
    visibleCount = isMobile ? 1 : 3;
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - visibleCount : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(Math.min(index, images.length - visibleCount));
  };

  const visibleImages = images.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <Box
      sx={{
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Основной контейнер с изображениями */}
      <Box
        sx={{
          width: '100%',
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: grey,
          borderRadius: 1
        }}
      >
        {/* Основной контейнер с изображениями */}
        <Box
          sx={{
            width: '100%',
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: grey,
            borderRadius: 1
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 16,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              gap: `${gap}px`,
              padding: `0 ${gap}px`
            }}
          >
            {visibleImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  minWidth: 0, // Важно для правильного масштабирования
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}` + image}
                  alt={`Slide ${currentIndex + index}`}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    margin: 'auto'
                  }}
                />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 16,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Секция миниатюр БЕЗ скролла */}
      {!isMobile && (<Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap', // Перенос на новую строку при нехватке места
          gap: 1,
          mt: 2,
          width: '100%',
          py: 1,
          overflow: 'hidden' // Убираем скролл
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => goToImage(index)}
            sx={{
              width: 60,
              height: 60,
              minWidth: 60,
              cursor: 'pointer',
              border: index >= currentIndex && index < currentIndex + visibleCount
                ? `2px solid ${theme.palette.primary.main}`
                : '2px solid transparent',
              borderRadius: 1,
              overflow: 'hidden',
              opacity: index >= currentIndex && index < currentIndex + visibleCount ? 1 : 0.7,
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}` + image}
              alt={`Thumbnail ${index}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        ))}
      </Box>)}
    </Box>
  );
};

export default ImageCarousel;