import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "components/Post";
import { db } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
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

export default Feed;
