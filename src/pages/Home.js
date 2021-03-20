import React, {useState, useEffect} from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import { auth, db } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
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

function Home() {
  const [Posts, setPosts] = useState([]);
  const [user, setUser] = useState();

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
        <img src={instagramLogo} alt="instagram logo" />
      </Header>
      {/* list of posts */}
{console.log(Posts)}
      {Posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      
    </AppContainer>
  );
}

export default Home;
