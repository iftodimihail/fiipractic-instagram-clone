import React from "react";
import styled from "styled-components";
import { Carousel } from "antd";

const ImageCarouselContainer = styled(Carousel)`
  max-height: 600px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const ImageCarousel = ({ imagesUrl }) => {
  return (
    <ImageCarouselContainer>
      {imagesUrl.map((imageUrl, index) => (
        <ImageContainer key={index}>
          <img src={imageUrl} alt="post" />
        </ImageContainer>
      ))}
    </ImageCarouselContainer>
  );
};

export default ImageCarousel;
