import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "components/Post";
import { db } from "utils/firebase";

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

      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}

    </AppContainer>
  );
}

export default Home;
