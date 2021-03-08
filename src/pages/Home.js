import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
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

const AddItemContainer = styled.div`
  position: relative;
  display: flex;
  width: 400px;
`;

const AddItemInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border: 1px solid lightgray;
  padding: 10px 50px 10px 10px;
  margin: 40px 0;
  color: grey;

  :hover,
  :focus {
    border-color: none;
    box-shadow: none;
    border: 1px solid lightgray;
  }
`;

const AddItemButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 10px;
  height: 35%;
  margin: 40px 0;

  :hover,
  :focus {
    background: transparent;
    color: #0785f2;
    border: 1px solid lightgray;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");

  const items = [post1, post2, post3, post4, post5, post6];
  const randomPhoto = () => {
    return items[Math.floor(Math.random() * items.length)];
  };
  const image = (
    <Post userName="Bianca" points={points} post={randomPhoto(items)} />
  );

  const handlePostItem = () => {
    setPosts((prevPost) => {
      return [image, ...prevPost];
    });
    setPost("");
  };

  const images = [post1, post2, post3, post4, post5, post6];
  const mapImages = images.map((image, index) => (
    <Post key={index} userName="Bianca" points={points} post={image} />
  ));

  return (
    <AppContainer>
      <Header>
        <img src={instaLogo} alt="instaLogo" />
      </Header>
      <AddItemContainer>
        <AddItemInput
          placeholder="Add a new item"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <AddItemButton onClick={handlePostItem}>Add item</AddItemButton>
      </AddItemContainer>
      {posts}
      {mapImages}
    </AppContainer>
  );
};

export default Home;
