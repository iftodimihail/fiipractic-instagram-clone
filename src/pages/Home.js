import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import igLogo from "assets/instaLogo.png";
import Post from "components/Post";
import DropdownMenu from "components/DropdownMenu";
import UploadModal from "components/UploadModal";
import firebase, { auth, db } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
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

const Home = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  const myUser = firebase.auth().currentUser;

  return (
    <AppContainer>
      <Header>
        <img src={igLogo} alt="Instagram Logo" />
        {myUser ? (
          <DropdownMenu
            username={user?.displayName}
            openUploadModal={() => setIsOpenedModal(true)}
          />
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </Header>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        username={user?.displayName}
      />
    </AppContainer>
  );
};

export default Home;
