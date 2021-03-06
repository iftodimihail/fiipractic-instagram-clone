import React from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  margin-bottom: 2px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

function Home() {
  return (
    <AppContainer>
      {/* header */}
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
      </Header>
      {/* posts */}
      <Post />
    </AppContainer>
  );
}

export default Home;
