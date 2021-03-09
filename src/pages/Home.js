import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import PostForm from "components/PostForm";
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
  border-bottom: 1px solid lightgrey;
  padding: 12px;
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

function Home() {
  const [posts, setPosts] = useState([{ id: 1, username: "Maria" }]);

  const addNewPost = (value) => {
    let id = posts.length >= 0 ? posts[0].id + 1 : 1;
    let post = { id: id, username: value };
    setPosts((prevPosts) => {
      return [post, ...prevPosts];
    });
  };

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="Instagram Logo" />
      </Header>
      <PostForm addNewPost={addNewPost} />
      {/* posturile */}
      {posts.map((post, index) => {
        return <Post key={index} id={post.id} username={post.username} />;
      })}
    </AppContainer>
  );
}

export default Home;
