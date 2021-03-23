import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import * as admin from "firebase-admin";

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
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  :hover,
  :focus {
    background-color: white;
    color: black;
  }
  a {
    padding: 5px, 9px;
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
  const [followState, setFollowState] = useState("Loading...");
  const [myUser, setMyUser] = useState();
  const [profile, setProfile] = useState();
  const history = useHistory();
  const { id } = useParams();

  const renderProfilePosts = () => {
    return posts.map(({ imageUrl }, index) => {
      return (
        <PostContainer key={index}>
          <img src={imageUrl} alt="post"></img>
        </PostContainer>
      );
    });
  };

  const setButton = async (user, userProfile) => {
    if (userProfile == user) setFollowState("Edit profile");
    else if (userProfile == id) {
      await db
        .collection("users")
        .doc(user)
        .get()
        .then((myProfile) => {
          if (myProfile.exists) {
            if (myProfile.data().following.includes(userProfile))
              setFollowState("Unfollow");
            else setFollowState("Follow");
          } else setFollowState("Login needed");
        });
    }
    return followState;
  };

  async function ManageFollow() {
    if (followState === "Follow") {
      const userColl = await db.collection("users");
      userColl.doc(profile).update({
        followers: admin.firestore.FieldValue.arrayUnion(myUser.displayName),
      });

      userColl.doc(myUser.displayName).update({
        following: admin.firestore.FieldValue.arrayUnion(profile),
      });

      setFollowersNumber((no) => no + 1);
      setFollowState("Unfollow");
    } else if (followState === "Unfollow") {
      const userColl = await db.collection("users");
      userColl.doc(profile).userProfileDoc.update({
        followers: admin.firestore.FieldValue.arrayRemove(myUser.displayName),
      });

      userColl.doc(myUser.displayName).update({
        following: admin.firestore.FieldValue.arrayRemove(profile),
      });

      setFollowersNumber((no) => no - 1);
      setFollowState("Follow");
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setMyUser(authUser);
    });

    if (myUser) {
      if (id) setProfile(id);
      else setProfile(myUser.displayName);
      const users = db.collection("users");
      if (profile) {
        users?.where("username", "==", profile).onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            const myUserTemp = snapshot.docs[0].data();
            setFollowingNumber(myUserTemp.following.length);
            setFollowersNumber(myUserTemp.followers.length);
          } else {
            history.push(`/${"myprofile"}`);
          }
        });
        const btn = setButton(myUser.displayName, profile);
        if (btn !== "Login needed") {
          db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
              const filteredPosts = snapshot.docs.filter((doc) => {
                return doc.data().username === profile;
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
    }

    return () => unsubscribe();
  }, [myUser, profile, followState, followersNo]);

  return (
    <ProfileContainer>
      <ProfileDetails>
        <MyAvatar size={128}>{profile?.[0]?.toUpperCase()}</MyAvatar>
        <ProfileInfo>
          <UserAndButton>
            <Username>{profile}</Username>
            <FollowButton onClick={ManageFollow}>{followState}</FollowButton>
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
