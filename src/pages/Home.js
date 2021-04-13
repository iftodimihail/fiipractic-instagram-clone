import React, { useEffect, useState } from "react";
import Post from "components/Post";
import HomeSidebar from "components/HomeSidebar";
import { auth, db } from "utils/firebase";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
`;

const PostList = styled.div`
  margin-right: 28px;
  max-width: 614px;
  width: 100%;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        db.collection("follows")
          .get()
          .then((data) => {
            const following = data.docs
              .filter((doc) => doc.data().follower === auth.currentUser.uid)
              .map((doc) => doc.data().following);
            setPosts(
              snapshot.docs
                .filter(
                  (doc) =>
                    following.includes(doc.data().userid) ||
                    doc.data().userid === auth.currentUser.uid
                )
                .map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          });
      });
  }, []);

  return (
    <HomeContainer>
      <PostList>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </PostList>
      <HomeSidebar />
    </HomeContainer>
  );
}

export default Home;
