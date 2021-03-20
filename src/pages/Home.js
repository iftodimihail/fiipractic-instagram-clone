import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import instaLogo from "../assets/instaLogo.png";
import Post from "../components/Post";
import DropDownMenu from "../components/DropDownMenu";
import UploadModal from "../components/UploadModal";
import points from "../assets/points.png";
// import post1 from "../assets/1.jpg";
// import post2 from "../assets/2.jpg";
// import post3 from "../assets/3.jpg";
// import post4 from "../assets/4.jpg";
// import post5 from "../assets/5.jpg";
// import post6 from "../assets/6.jpg";
import { db, auth } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  background-color: white;
  img {
    height: 40px;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  // const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [postsEp2, setPostsEp2] = useState([]);
  const [user, setUser] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setPostsEp2(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          imageUrl: doc.data().imageUrl,
        }))
      )
    );
  }, []);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unSubscribe();
  }, [user]);

  // const items = [post1, post2, post3, post4, post5, post6];
  // const randomPhoto = () => {
  //   return items[Math.floor(Math.random() * items.length)];
  // };
  // const image = (
  //   <Post userName="Bianca" points={points} post={randomPhoto(items)} />
  // );

  // const handlePostItem = () => {
  //   setPosts((prevPost) => {
  //     return [image, ...prevPost];
  //   });
  //   setPost("");
  // };

  // const images = [post1, post2, post3, post4, post5, post6];
  // const mapImages = images.map((image, index) => (
  //   <Post key={index} userName="Bianca" points={points} post={image} />
  // ));

  return (
    <AppContainer>
      <Header>
        <img src={instaLogo} alt="instaLogo" />
        <DropDownMenu
          username={user?.displayName}
          openUploadModal={() => setIsOpenModal(true)}
        ></DropDownMenu>
      </Header>
      <AddItemContainer>
        <AddItemInput
          placeholder="Add a new item"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <AddItemButton>Add item</AddItemButton>
      </AddItemContainer>

      {/* {posts} */}

      {postsEp2.map((post) => (
        <Post key={post.id} points={points} {...post} />
      ))}

      <UploadModal
        isOpened={isOpenModal}
        setIsOpen={setIsOpenModal}
        username={user?.displayName}
      />

      {/* {mapImages} */}
      {/* <UploadModal isOpened={setIsOpenModal(true)}></UploadModal> */}
    </AppContainer>
  );
};

export default Home;
