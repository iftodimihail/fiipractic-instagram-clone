import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import AddPost from "components/AddPost";

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
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);

  const getNewPost = (postData) => {
    setPosts((prevPosts) => {
      return [...prevPosts, postData];
    });
  };

  return (
    <AppContainer>
      {/* header */}
      <Header>
        <img src={instagramLogo} alt="Logo" />
      </Header>
      {/* {list of posts} */}
      {posts.map((postUsername, index) => (
        <Post key={posts + index} username={postUsername} />
      ))}
      <AddPost parentCallback={getNewPost} />
    </AppContainer>
  );
}

export default Home;
