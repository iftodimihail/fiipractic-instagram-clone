import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import UploadModal from "components/common/UploadModal";
import { useParams } from "react-router-dom";

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
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [profileId, setProfileId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const { username } = useParams();

  db.collection("users")
    .where("userName", "==", username)
    .onSnapshot((doc) => {
      if (doc.empty) return setUserExists(false);
    });

  const renderProfilePosts = () => {
    if (posts.length)
      return posts.map(({ imageUrl }, index) => {
        return (
          <PostContainer key={index}>
            <img src={imageUrl} alt="post" />
          </PostContainer>
        );
      });
    return <div>No posts.</div>;
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        await db.collection("users").onSnapshot((userSnap) => {
          const userid = userSnap.docs.filter(
            (doc) => doc.data().userName === username
          )[0]?.id;

          setProfileId(userid);

          const avatar = userSnap.docs
            .filter((doc) => doc.data().userName === username)[0]
            ?.data().profilePicture;

          setProfilePicture(avatar);

          const filteredPosts = snapshot.docs.filter(
            (doc) => doc.data().userid === userid
          );

          return setPosts(
            filteredPosts.map((post) => ({
              id: post.id,
              ...post.data(),
            }))
          );
        });
      });
  }, [username]);

  async function onAvatarUploadSuccess(imageUrl) {
    await db.collection("users").doc(auth.currentUser.uid).set(
      {
        profilePicture: imageUrl,
      },
      { merge: true }
    );
  }

  return userExists ? (
    <ProfileContainer>
      <ProfileDetails>
        <AvatarWrapper>
          {profileId === auth.currentUser?.uid ? (
            <CameraIcon onClick={() => setIsModalOpen(true)} />
          ) : null}
          <MyAvatar size={128} src={profilePicture}>
            {username[0]?.toUpperCase()}
          </MyAvatar>
        </AvatarWrapper>
        <ProfileInfo>
          <Username>{username}</Username>
          <ProfileStats>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </ProfileStats>
        </ProfileInfo>
      </ProfileDetails>
      <ProfilePosts>{renderProfilePosts()}</ProfilePosts>
      <UploadModal
        title="Avatar upload"
        isOpened={isModalOpen}
        setIsOpen={setIsModalOpen}
        folderName="avatars"
        onSuccess={onAvatarUploadSuccess}
      />
    </ProfileContainer>
  ) : (
    <div>Profile not found.</div>
  );
}

export default Profile;
