import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import { auth, db } from "utils/firebase";
import DropdownMenu from "components/DropdownMenu";
import UploadModal from "components/UploadModal";
import { Link } from "react-router-dom";

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
  padding: 20px;
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

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
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
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, []);

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
        {user ? (
          <DropdownMenu
            username={user?.displayName}
            openUploadModal={() => setIsOpenedModal(true)}
          />
        ) : (
          <Link to="/login">Login</Link>
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
}

export default Home;
