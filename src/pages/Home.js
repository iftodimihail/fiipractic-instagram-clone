import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "components/Post";
import { db } from "utils/firebase";
import { auth } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const NoPostsConstainer = styled.div`
  margin-top: 40px;
  font-size: 18px;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Message = styled.div``;

function Home() {
  const [posts, setPosts] = useState([]);
  const [myUser, setMyUser] = useState();
  const [profile, setProfile] = useState();
  const [myFollowers, setFollowers] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setMyUser(authUser);
    });

    if (myUser) {
      setProfile(myUser.displayName);

      const users = db.collection("users");
      if (profile) {
        users?.where("username", "==", profile).onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            const myUserTemp = snapshot.docs[0].data();
            setFollowers(myUserTemp.following);
          }
        });

        db.collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            const filteredPosts = snapshot.docs.filter((doc) => {
              return myFollowers.includes(doc.data().username);
            });

            return setPosts(
              filteredPosts.map((post) => ({
                id: post.id,
                ...post.data(),
              }))
            );
          });
      }
    }
    return () => unsubscribe();
  }, [myUser, profile, myFollowers]);

  return (
    <AppContainer>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <NoPostsConstainer>
          <Message>
            No posts found. This is because you either do not follow any user or
            the users you follow did not post anything.
          </Message>
          <Message>
            You can start finding people and posts using the News Feed button.
          </Message>
        </NoPostsConstainer>
      )}
    </AppContainer>
  );
}

export default Home;
