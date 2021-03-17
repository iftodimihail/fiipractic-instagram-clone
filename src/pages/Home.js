import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import { auth, db } from "utils/firebase";
import DropDownMenu from "components/DropDownMenu";
import UploadModal from "components/UploadModal";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  z-index: 10px;
  top: 0;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  backgroup-color: white;
  height: 50px;
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
  const [isOpenModal, setIsOpenedModal] = useState(false);

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
        //setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))) echivalent cu:
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
            imageUrl: doc.data().imageUrl,
            caption: doc.data().caption,
          }))
        )
      );
  }, []);

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
        {/* {user?.displayName} inlocuit cu:  */}
        <DropDownMenu
          username={user?.displayName}
          openUploadModal={() => setIsOpenedModal(true)}
        />
      </Header>
      {posts.map((post) => (
        // <Post key={post.id} username={post.username} imageUrl={post.imageUrl} />
        <Post key={post.id} {...post} />
      ))}
      <Post username="Delia" />
      <UploadModal
        isOpenModal={isOpenModal}
        setIsOpen={setIsOpenedModal}
        username={user?.displayName}
      />
    </AppContainer>
  );
}

export default Home;
