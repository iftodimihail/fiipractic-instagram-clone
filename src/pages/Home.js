import React from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 12px;
  img {
    height: 40px;
    object-fit: contain;
  }
`;

function Home() {
  return (
    <AppContainer>
      {/*Header*/}
      <Header>
        <img src={instagramLogo} alt="instagram logo"></img>
      </Header>
      <Post/>
      {/*List of posts*/}
    </AppContainer>
  );
}

export default Home;
