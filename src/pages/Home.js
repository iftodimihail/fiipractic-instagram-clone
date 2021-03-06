import React from "react";
import styled from "styled-components";
import instaLogo from "../assets/instaLogo.png";
import Post from "../components/Post";
import points from "../assets/points.png";
import post1 from "../assets/1.jpg";
import post2 from "../assets/2.jpg";
import post3 from "../assets/3.jpg";
import post4 from "../assets/4.jpg";
import post5 from "../assets/5.jpg";
import post6 from "../assets/6.jpg";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
  margin-botton: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const Home = () => {
  const images = [post1, post2, post3, post4, post5, post6];
  const mapImage = images.map((image, index) => (
    <Post key={index} userName="Bianca" points={points} post={image} />
  ));
  return (
    <AppContainer>
      <Header>
        <img src={instaLogo} alt="instaLogo" />
      </Header>
      {mapImage}
    </AppContainer>
  );
};

export default Home;
