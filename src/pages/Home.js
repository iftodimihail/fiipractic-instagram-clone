import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "components/Post";
import UploadModal from "components/UploadModal";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { auth, db } from "utils/firebase";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(250, 250, 250, 1);
`;

const HomeContainer = styled.div`
  width: 80%;
  position: relative;
  max-width: 1000px;
  margin-top: 80px;
`;

const PostsContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const SidebarContainer = styled.div`
  width: 35%;
  right: 0px;
  top: 80px;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const FixedSlidebarContent = styled.div`
  position: fixed;
`;

function Home({ user }) {
  const [Posts, setPosts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
    <AppContainer>
      {/* header */}
      <Navbar username={user?.displayName} setIsOpen={setIsOpenModal} />

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
            <Sidebar />
          </FixedSlidebarContent>
        </SidebarContainer>
      </HomeContainer>

      <UploadModal
        isOpened={isOpenModal}
        setIsOpen={setIsOpenModal}
        username={user?.displayName}
      />
    </AppContainer>
  );
}

export default Home;
