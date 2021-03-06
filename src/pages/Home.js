import React from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from 'components/Post';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 10px;
  
  img{
  height: 40px;
  object-fit: contain;
  }
`;

function Home() {
  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="Instagram Logo" />
      </Header>
      <Post/>
    </AppContainer>
  );
}

export default Home;
