import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import { Input, Button } from "antd";

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

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const AddPostContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const AddPostInput = styled(Input)`
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 5px 5px 5px 5px;

  :hover,
  :focus {
    box-shadow: none;
  }
`;

const AddPostButton = styled(Button)`
  padding: 5px 10px 5px 10px;
  height: 100%;
  border: 1px solid lightgray;
  margin-left: 10px;

  :hover,
  :focus {
    color: #5094ce;
  }
`;

function Home() {
  const [username, setUsername] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [posts, setPosts] = useState([]);

  const handlePostComments = () => {
    setPosts((prevPosts) => {
      return [...prevPosts, { username: username }];
    });
    setUsername("");
    setIsDisabled(!isDisabled);
  };

  const handleAddUsername = (event) => {
    setUsername(event.target.value);
    if (event.target.value.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="Instagram Logo"/>
      </Header>
      <AddPostContainer>
        <AddPostInput
          placeholder="Username"
          value={username}
          onChange={handleAddUsername}
        />
        <AddPostButton
          disabled={isDisabled}
          type="text"
          onClick={handlePostComments}
        >
          Add Post
        </AddPostButton>
      </AddPostContainer>
      {posts.map((post) => (
        <Post
          key={Math.floor(Math.random() * 100 + 1)}
          username={post.username}
        />
      ))}
    </AppContainer>
  );
}

export default Home;
