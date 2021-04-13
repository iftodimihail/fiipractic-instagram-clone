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

  @media (max-width: 999px) {
    margin-right: 0;
  }
`;

const NoPostsNotice = styled.div`
  margin-right: 28px;
  max-width: 614px;
  width: 100%;
  border: 1px solid lightgray;
  text-align: center;
  padding: 16px;
  font-weight: 600;
  border-radius: 4px;
  margin-bottom: 40px;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [noFollowing, setNoFollowing] = useState(false);

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
            if (following.length > 0) {
              setNoFollowing(false);
              setPosts(
                snapshot.docs
                  .filter(
                    (doc) =>
                      following.includes(doc.data().userid) ||
                      doc.data().userid === auth.currentUser.uid
                  )
                  .map((doc) => ({ id: doc.id, ...doc.data() }))
              );
            } else {
              setNoFollowing(true);
              setPosts(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
              );
            }
          });
      });
  }, []);

  return (
    <HomeContainer>
      <PostList>
        {noFollowing ? (
          <NoPostsNotice>
            You aren&apos;t following anyone.
            <br />
            We&apos;ll show you posts from all the users instead.
          </NoPostsNotice>
        ) : null}
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </PostList>
      <HomeSidebar />
    </HomeContainer>
  );
}

export default Home;
