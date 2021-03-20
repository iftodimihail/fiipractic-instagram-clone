import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "antd";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  width: 600px;
  height: 200px;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  margin-right: 75px;
  margin-left: 25px;
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

const UserAndButton = styled.div`
  display: flex;
  flex-direction: row;
  //width: 200px;
  margin-bottom: 0;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: none;
  height: 0;
  /* margin-bottom: 20px; */
`;

const FollowButton = styled(Button)`
  height: 32px;
  width: 200px;
  margin-bottom: none;
  margin-top: 10px;
  background-color: lightskyblue;
  font-size: 18px;
  font-weight: 500;
  :hover,
  :focus {
    background-color: lightskyblue;
    color: black;
  }
`;

const ProfileStats = styled.span`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  //gap: 130px;
`;

const Info = styled.span`
  font-size: 16px;
`;

const PostContainer = styled.div`
  width: 280px;
  height: 280px;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  justify-content: space-between;
`;

function Profile() {
  const [posts, setPosts] = useState([]);
  const [followersNo, setFollowersNumber] = useState(0);
  const [followingNo, setFollowingNumber] = useState(0);
  const history = useHistory();
  let { id } = useParams();
  const currentUser = id ? id : auth.currentUser?.displayName;

  const renderProfilePosts = () => {
    return posts.map(({ imageUrl }, index) => {
      return (
        <PostContainer key={index}>
          <img src={imageUrl} alt="post"></img>
        </PostContainer>
      );
    });
  };

  const setButton = () => {
    if (currentUser == auth.currentUser?.displayName) return "EDIT";
    if (currentUser == id) return "FOLLOW";
    return "Login needed";
  };

  const ManageFollow = () => {
    // if (currentUser == id && currentUser != auth.currentUser?.displayName) {
    //   db.ref("users")
    //     .orderByChild("username")
    //     .equalTo(currentUser)
    //     .once("value")[0]
    //     .then(function (snapshot) {
    //       snapshot.ref.child("followers").push(auth.currentUser?.displayName);
    //     });
    // }
  };

  useEffect(() => {
    const users = db.collection("users");
    users?.where("username", "==", currentUser).onSnapshot((snapshot) => {
      if (snapshot.docs.length > 0) {
        const myUser = snapshot.docs[0].data();
        setFollowingNumber(myUser.following.length);
        setFollowersNumber(myUser.followers.length);
      } else {
        history.push(`/${"myprofile"}`);
      }
    });

    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const filteredPosts = snapshot.docs.filter((doc) => {
          return doc.data().username === currentUser;
        });

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
        <MyAvatar size={128}>{currentUser?.[0]?.toUpperCase()}</MyAvatar>
        <ProfileInfo>
          <UserAndButton>
            <Username>{currentUser}</Username>
            <FollowButton onClick={ManageFollow}>{setButton()}</FollowButton>
          </UserAndButton>
          <ProfileStats>
            <Info>Posts: {posts.length}</Info>
            <Info>Followers: {followersNo}</Info>
            <Info>Following: {followingNo}</Info>
          </ProfileStats>
        </ProfileInfo>
      </ProfileDetails>
      <ProfilePosts>{renderProfilePosts()}</ProfilePosts>
    </ProfileContainer>
  );
}

export default Profile;
