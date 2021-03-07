import React, { useState } from "react";
import styled from "styled-components";
import logo from "assets/instaLogo.png";
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
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  img {
    height: 40px;
    object-fit: contain;
  }
`;

const PostForm = styled.form`
  margin: 24px 0;
  input {
    margin: 6px 0;
  }
  input {
    margin: 8px 0;
  }
  button {
    margin: 16px 0;
  }
`;

function Home() {
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const handleForm = () => {
    setPosts((prevState) => {
      return [...prevState, { username, imageUrl }];
    });

    setUsername("");
    setImageUrl("");
  };
  return (
    <AppContainer>
      {/* Header */}
      <Header>
        <img src={logo} alt="" />
      </Header>
      {/* Form */}
      <PostForm>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button type="primary" onClick={handleForm}>
          Posteaza
        </Button>
      </PostForm>
      {/* List of posts */}
      {/* 
        Test: 
        username: Alexe Vlad 
        imageUrl: https://images.unsplash.com/photo-1614945083596-4c40bbd058a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80 
      */}
      {posts.map((post, index) => (
        <Post key={index} username={post.username} imageUrl={post.imageUrl} />
      ))}
      <Post
        username="Alexe Vlad"
        imageUrl={
          "https://images.unsplash.com/photo-1614945083596-4c40bbd058a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        }
      />
    </AppContainer>
  );
}

export default Home;
