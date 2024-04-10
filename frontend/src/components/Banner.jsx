import React from 'react';
import { Carousel } from 'react-bootstrap';

const Banner = ({ banners }) => {
  return (
    <Carousel>
      {banners.map((banner, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={banner.imageUrl}
            alt={banner.altText}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;