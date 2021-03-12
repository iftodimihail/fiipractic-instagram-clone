import React, { useState } from "react";
import { Input, Button } from "antd";
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
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const AddPostContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  * + * {
    margin-left: 10px;
  }
`;

const PostInput = styled(Input)``;

const PostButton = styled(Button)`
  background-color: transparent;
  color: #5094ce;
  border: 1px solid #5094ce;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
    border: 1px solid #5094ce;
  }
`;

function Home() {
  const [usernameText, setUsernameText] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostUsername = () => {
    if (usernameText.length) {
      setPosts((prevPosts) => {
        return [usernameText, ...prevPosts];
      });
    }
  };

  return (
    <AppContainer>
      {/*header*/}
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
      </Header>
      {/*list of posts*/}
      <AddPostContainer>
        <PostInput
          placeholder="Username"
          value={usernameText}
          onChange={(event) => setUsernameText(event.target.value)}
        />
        <PostButton type="text" onClick={handlePostUsername}>
          Add Post
        </PostButton>
      </AddPostContainer>
      {posts.map((username, index) => (
        <Post key={username + index} username={username} />
      ))}
    </AppContainer>
  );
}

export default Home;
