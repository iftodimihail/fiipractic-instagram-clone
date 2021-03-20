import React, {useState, useEffect} from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import DropdownMenu from "components/DropdownMenu"
import UploadModal from "components/UploadModal"
import { auth, db } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

function Home() {
  const [Posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    })

    return () => unsubcribe();
  }, [user]);

  useEffect (() => {
     db.collection("posts")
     .onSnapshot((snapshot) => 
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data()
        })) 
      ) 
     )
  }, []);

  return (
    <AppContainer>
      {/* header */}
      <Header>
        <div />
        <img src={instagramLogo} alt="instagram logo" />
        <DropdownMenu username={user?.displayName} openUploadModal={() => setIsOpenModal(true)} />
      </Header>
      {/* list of posts */}

      {Posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      
      <UploadModal isOpened={isOpenModal} setIsOpen={setIsOpenModal} username={user?.displayName} />

    </AppContainer>
  );
}

export default Home;
