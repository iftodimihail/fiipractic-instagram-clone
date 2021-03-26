import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "components/Post";
import Sidebar from "components/Sidebar";
import AppLayout from "templates/AppLayout";
import { auth, db } from "utils/firebase";

const HomeContainer = styled.div`
  width: 80%;
  position: relative;
  max-width: 1000px;
`;

const PostsContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const SidebarContainer = styled.div`
  width: 35%;
  right: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const FixedSlidebarContent = styled.div`
  position: fixed;
  width: inherit;
  max-width: 300px;
`;

function Home({ user }) {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  }, []);

  return (
    <AppLayout user={user}>
      <HomeContainer>
        {/* list of posts */}

        <PostsContainer>
          {Posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostsContainer>

        {/* Sidebar elements */}

        <SidebarContainer>
          <FixedSlidebarContent>
            <Sidebar username={user?.displayName} />
          </FixedSlidebarContent>
        </SidebarContainer>
      </HomeContainer>
    </AppLayout>
  );
}

export default Home;
