import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "components/Post";
import { db } from "utils/firebase";
import Header from "components/Header";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <AppContainer>
      <Header></Header>

      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}

    </AppContainer>
  );
}

export default Home;
