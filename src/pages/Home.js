import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "assets/instaLogo.png";
import Post from "components/Post";
import { Input, Button } from "antd";
import { db, auth } from "utils/firebase";
import DropdownMenu from "components/DropdownMenu";
import UploadModal from "components/UploadModal";

import { useHistory } from "react-router";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  img {
    height: 40px;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const history = useHistory();
  const handleForm = () => {
    setPosts((prevState) => {
      return [...prevState, { username, imageUrl }];
    });

    setUsername("");
    setImageUrl("");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [history, user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
    return () => {};
  }, []);
  return (
    <AppContainer>
      <Header>
        <img src={logo} alt="" />
        <DropdownMenu
          username={user?.displayName}
          openUploadModal={() => setIsOpenedModal(true)}
        />
      </Header>
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
      {/* 
        Test: 
        username: Alexe Vlad 
        imageUrl: https://images.unsplash.com/photo-1614945083596-4c40bbd058a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80 
      */}
      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
      <UploadModal
        username={user?.displayName}
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
      />
      {/*
      <Post
        username="Alexe Vlad"
        imageUrl={
          "https://images.unsplash.com/photo-1614945083596-4c40bbd058a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        }
      /> */}
    </AppContainer>
  );
}

export default Home;
