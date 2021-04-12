import React, { useState, useEffect } from "react";
import { Avatar, Button } from "antd";
import {
  CameraOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import UploadModal from "components/common/UploadModal";
import { useParams } from "react-router-dom";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileDetails = styled.div`
  display: flex;
  width: 100%;

  align-items: center;

  border-bottom: 1px solid lightgrey;
  padding-bottom: 40px;
  margin-bottom: 40px;
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
  margin-right: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${CameraIcon} {
    display: none;
  }

  :hover {
    ${CameraIcon} {
      position: absolute;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 128px;
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
  flex-grow: 3;
`;

const ProfileInfoHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-right: 30px;
`;

const ProfileStats = styled.div`
  font-size: 16px;
  display: flex;
  margin: 20px 0;

  .count-and-label {
    .number {
      font-weight: 600;
    }
  }

  .count-and-label + .count-and-label {
    margin-left: 40px;
  }
`;

const ProfileDescription = styled.div`
  font-size: 16px;
`;
const Fullname = styled.div`
  font-weight: 600;
`;

const ProfilePosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

const PostDetails = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
`;

const PostContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :hover {
    ${PostDetails} {
      display: flex;
    }
  }
`;

const HeartIcon = styled(HeartOutlined)`
  margin-right: 5px;
`;

const CommentIcon = styled(CommentOutlined)`
  margin-left: 30px;
  margin-right: 5px;
`;

function Profile() {
  const [alreadyFollowed, setAlreadyFollowed] = useState("");
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
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
      return posts.map((post, index) => {
        return (
          <PostContainer key={index}>
            <img src={post.imageUrl} alt="post" />
            <PostDetails>
              <HeartIcon />
              {post.likes} <CommentIcon />
              {post.comments}
            </PostDetails>
          </PostContainer>
        );
      });
    return <div>No posts.</div>;
  };

  const handleFollow = async () => {
    if (!!alreadyFollowed) {
      await db.collection("follows").doc(alreadyFollowed).delete();
      setAlreadyFollowed("");
    } else {
      db.collection("follows").add({
        follower: auth.currentUser.uid,
        following: profileId,
      });
    }
  };

  useEffect(() => {
    db.collection("follows").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (
          doc.data().follower === auth.currentUser?.uid &&
          doc.data().following === profileId
        )
          setAlreadyFollowed(doc.id);
      });
      setFollowers(
        snapshot.docs.filter((doc) => doc.data().following === profileId).length
      );
      setFollowing(
        snapshot.docs.filter((doc) => doc.data().follower === profileId).length
      );
    });
  });

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        db.collection("users").onSnapshot((userSnap) => {
          const userid = userSnap.docs.filter(
            (doc) => doc.data().userName === username
          )[0]?.id;

          setProfileId(userid);

          const avatar = userSnap.docs
            .filter((doc) => doc.data().userName === username)[0]
            ?.data().profilePicture;

          setProfilePicture(avatar);

          const description = userSnap.docs
            .filter((doc) => doc.data().userName === username)[0]
            ?.data().description;

          setDescription(description);

          const fullName = userSnap.docs
            .filter((doc) => doc.data().userName === username)[0]
            ?.data().fullName;

          setFullName(fullName);

          const filteredPosts = snapshot.docs.filter(
            (doc) => doc.data().userid === userid
          );

          return Promise.all(
            filteredPosts.map(async (post) => {
              let likes = 0,
                comments = 0;
              await db
                .collection("posts")
                .doc(post.id)
                .collection("likes")
                .get()
                .then((doc) => (likes = doc.size));
              await db
                .collection("posts")
                .doc(post.id)
                .collection("comments")
                .get()
                .then((doc) => (comments = doc.size));
              return {
                id: post.id,
                ...post.data(),
                likes: likes,
                comments: comments,
              };
            })
          ).then(setPosts);
        });
      });
  }, [username, profileId]);

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
          <ProfileInfoHeader>
            <Username>{username}</Username>
            {profileId === auth.currentUser?.uid ? (
              <Button>Edit profile</Button>
            ) : alreadyFollowed ? (
              <Button onClick={handleFollow}>Unfollow</Button>
            ) : (
              <Button type="primary" onClick={handleFollow}>
                Follow
              </Button>
            )}
          </ProfileInfoHeader>
          <ProfileStats>
            <div className="count-and-label">
              <span className="number">{posts.length}</span>{" "}
              {posts.length === 1 ? "post" : "posts"}
            </div>
            <div className="count-and-label">
              <span className="number">{followers}</span>{" "}
              {followers === 1 ? "follower" : "followers"}
            </div>
            <div className="count-and-label">
              <span className="number">{following}</span> following
            </div>
          </ProfileStats>
          <ProfileDescription>
            <Fullname>{fullName}</Fullname>
            <div>{description}</div>
          </ProfileDescription>
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
