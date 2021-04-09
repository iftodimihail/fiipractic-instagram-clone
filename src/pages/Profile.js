import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import AvatarUploadModal from "components/AvatarUploadModal";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  width: 900px;
  height: 200px;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 50px;
`;

const CameraIcon = styled(CameraOutlined)`
  font-size: 56px;
  color: #fff;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 75px;
  margin-left: 25px;
  ${CameraIcon} {
    display: none;
  }
  :hover {
    ${CameraIcon} {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  span {
    font-size: 48px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  flex-grow: 1;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const ProfileStats = styled.span`
  font-size: 16px;
`;

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
`;

const PostContainer = styled.div`
  width: 280px;
  height: 280px;
  margin-bottom: 30px;
  margin-right: 30px;
  :nth-child(3n + 3) {
    margin-right: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Profile() {
  const [avatar, setAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(
    () => auth.onAuthStateChanged((user) => setAvatar(user.photoURL)),
    []
  );

  const renderProfilePosts = () => {
    return posts.map(({ imageUrl }, index) => {
      return (
        <PostContainer key={index}>
          <img src={imageUrl} alt="post" />
        </PostContainer>
      );
    });
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const filteredPosts = snapshot.docs.filter(
          (doc) => doc.data().username === auth.currentUser?.displayName
        );

        return setPosts(
          filteredPosts.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      });
  }, []);

  return (
    <ProfileContainer>
      <ProfileDetails>
        <AvatarWrapper>
          <CameraIcon onClick={() => setIsModalOpen(true)} />
          <MyAvatar size={128} src={avatar}>
            {auth.currentUser?.displayName?.[0]?.toUpperCase()}
          </MyAvatar>
        </AvatarWrapper>
        <ProfileInfo>
          <Username>{auth.currentUser?.displayName}</Username>
          <ProfileStats>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </ProfileStats>
        </ProfileInfo>
      </ProfileDetails>
      <ProfilePosts>{renderProfilePosts()}</ProfilePosts>
      <AvatarUploadModal
        isOpened={isModalOpen}
        setIsOpen={setIsModalOpen}
        setAvatar={setAvatar}
      />
    </ProfileContainer>
  );
}

export default Profile;
