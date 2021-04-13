import React, { useState, useEffect } from "react";
import { Avatar, Button, Modal } from "antd";
import {
  CameraOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import UploadModal from "components/common/UploadModal";
import { useHistory, useParams } from "react-router-dom";
import EditProfileModal from "components/EditProfileModal";

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

  @media (max-width: 735px) {
    flex-direction: column;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
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

  @media (max-width: 735px) {
    margin-right: 0;
    margin-bottom: 10px;
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

  @media (max-width: 735px) {
    width: 100%;
  }
`;

const ProfileInfoHeader = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 735px) {
    flex-direction: column;
  }
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-right: 30px;

  @media (max-width: 735px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ProfileStats = styled.div`
  font-size: 16px;
  display: flex;
  margin: 20px 0;

  @media (max-width: 735px) {
    width: 100%;
    justify-content: space-evenly;
  }

  .count-and-label {
    background: transparent;
    cursor: pointer;
    padding: 0;
    border: none;
    outline: none;

    @media (max-width: 735px) {
      width: 33%;
      text-align: center;
      line-height: 1.25;
    }

    .number {
      font-weight: 600;

      @media (max-width: 735px) {
        display: block;
        text-align: center;
        font-size: 20px;
      }
    }
  }

  .count-and-label + .count-and-label {
    margin-left: 40px;
  }
`;

const ProfileDescription = styled.div`
  font-size: 16px;

  @media (max-width: 735px) {
    text-align: center;
  }
`;
const Fullname = styled.div`
  font-weight: 600;
`;

const ProfilePosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  @media (max-width: 735px) {
    grid-gap: 2px;
    grid-template-columns: repeat(2, 1fr);
  }
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

  @media (max-width: 735px) {
    flex-direction: column;
  }
`;

const PostContainer = styled.a`
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

  @media (max-width: 735px) {
    margin-left: 0px;
  }
`;

const UserFollowContainer = styled.div`
  .follow-modal-username {
    margin-left: 14px;
    font-weight: 600;
    color: inherit;

    :hover {
      text-decoration: underline;
    }
  }
  & + & {
    margin-top: 16px;
  }
`;

function Profile() {
  const [alreadyFollowed, setAlreadyFollowed] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenFollowers, setIsModalOpenFollowers] = useState(false);
  const [isModalOpenFollowing, setIsModalOpenFollowing] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const { username } = useParams();

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  db.collection("users")
    .where("userName", "==", username)
    .onSnapshot((doc) => {
      if (doc.empty) return setUserExists(false);
    });

  const renderProfilePosts = () => {
    if (posts.length)
      return posts.map((post, index) => {
        return (
          <PostContainer
            key={index}
            href={`/post/${post.id}`}
            onClick={(e) => navigateToPage(e, "/post/" + post.id)}
          >
            <img src={post.imageUrl} alt="post" />
            <PostDetails>
              <div>
                <HeartIcon />
                {post.likes}
              </div>
              <div>
                <CommentIcon />
                {post.comments}
              </div>
            </PostDetails>
          </PostContainer>
        );
      });
    return null;
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
    db.collection("users")
      .where("userName", "==", username)
      .get()
      .then((userData) => {
        setProfileId(userData.docs[0].id);
        setProfilePicture(userData.docs[0].data().profilePicture);
        setDescription(userData.docs[0].data().description);
        setFullName(userData.docs[0].data().fullName);

        db.collection("follows").onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (
              doc.data().follower === auth.currentUser?.uid &&
              doc.data().following === userData.docs[0].id
            )
              setAlreadyFollowed(doc.id);
          });
          Promise.all(
            snapshot.docs
              .filter((doc) => doc.data().following === userData.docs[0].id)
              .map(async (doc) => {
                let username = "";
                let avatarUrl = "";

                await db
                  .collection("users")
                  .doc(doc.data().follower)
                  .get()
                  .then((userDoc) => {
                    username = userDoc.data().userName;
                    avatarUrl = userDoc.data().profilePicture;
                  });

                return {
                  id: doc.id,
                  ...doc.data(),
                  username: username,
                  avatarUrl: avatarUrl,
                };
              })
          ).then(setFollowers);
          Promise.all(
            snapshot.docs
              .filter((doc) => doc.data().follower === userData.docs[0].id)
              .map(async (doc) => {
                let username = "";
                let avatarUrl = "";

                await db
                  .collection("users")
                  .doc(doc.data().following)
                  .get()
                  .then((userDoc) => {
                    username = userDoc.data().userName;
                    avatarUrl = userDoc.data().profilePicture;
                  });

                return {
                  id: doc.id,
                  ...doc.data(),
                  username: username,
                  avatarUrl: avatarUrl,
                };
              })
          ).then(setFollowing);
        });
        db.collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot(async (snapshot) => {
            const filteredPosts = snapshot.docs.filter(
              (doc) => doc.data().userid === userData.docs[0].id
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
          <ProfileInfoHeader>
            <Username>{username}</Username>
            {profileId === auth.currentUser?.uid ? (
              <Button onClick={() => setIsModalOpenEdit(true)}>
                Edit profile
              </Button>
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
            <button
              className="count-and-label"
              onClick={() =>
                followers.length > 0 && setIsModalOpenFollowers(true)
              }
            >
              <span className="number">{followers.length}</span>{" "}
              {followers === 1 ? "follower" : "followers"}
            </button>
            <button
              className="count-and-label"
              onClick={() =>
                following.length > 0 && setIsModalOpenFollowing(true)
              }
            >
              <span className="number">{following.length}</span> following
            </button>
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
      <EditProfileModal
        title="Edit Profile"
        isOpen={isModalOpenEdit}
        setIsOpen={setIsModalOpenEdit}
        userid={auth.currentUser.uid}
        username={username}
        fullName={fullName}
        description={description}
      />
      <Modal
        title="Followers"
        visible={isModalOpenFollowers}
        onCancel={() => setIsModalOpenFollowers(false)}
        footer={null}
      >
        {followers.map((follow) => (
          <UserFollowContainer key={follow.id}>
            <a
              href={`/profile/${follow.username}`}
              onClick={(e) => {
                setIsModalOpenFollowers(false);
                return navigateToPage(e, "/profile/" + follow.username);
              }}
            >
              <Avatar src={follow.avatarUrl}>
                {follow.username[0].toUpperCase()}
              </Avatar>
            </a>
            <a
              className="follow-modal-username"
              href={`/profile/${follow.username}`}
              onClick={(e) => {
                setIsModalOpenFollowers(false);
                return navigateToPage(e, "/profile/" + follow.username);
              }}
            >
              {follow.username}
            </a>
          </UserFollowContainer>
        ))}
      </Modal>
      <Modal
        title="Following"
        visible={isModalOpenFollowing}
        onCancel={() => setIsModalOpenFollowing(false)}
        footer={null}
      >
        {following.map((follow) => (
          <UserFollowContainer key={follow.id}>
            <a
              href={`/profile/${follow.username}`}
              onClick={(e) => {
                setIsModalOpenFollowing(false);
                return navigateToPage(e, "/profile/" + follow.username);
              }}
            >
              <Avatar src={follow.avatarUrl}>
                {follow.username[0].toUpperCase()}
              </Avatar>
            </a>
            <a
              className="follow-modal-username"
              href={`/profile/${follow.username}`}
              onClick={(e) => {
                setIsModalOpenFollowing(false);
                return navigateToPage(e, "/profile/" + follow.username);
              }}
            >
              {follow.username}
            </a>
          </UserFollowContainer>
        ))}
      </Modal>
    </ProfileContainer>
  ) : null;
}

export default Profile;
