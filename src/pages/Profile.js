import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import firebase, { auth, db } from "utils/firebase";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import Popup from "reactjs-popup";
import EditProfileModal from "components/EditProfileModal";

import MiniPost from "components/MiniPost";

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
  margin-right: 50px;
  margin-left: 25px;
  span {
    font-size: 75px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 65%;
  width: 400px;
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
  margin-top: 0;
  //gap: 130px;
`;

const Info = styled.span`
  font-size: 16px;
`;



const DescDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
`;

function Profile() {
  const [posts, setPosts] = useState([]);
  const [followersNo, setFollowersNumber] = useState(0);
  const [followingNo, setFollowingNumber] = useState(0);
  const [followState, setFollowState] = useState("Loading...");
  const [description, setDescription] = useState("No description");
  const [PhotoComponent, setPhotoUrl] = useState();
  const [ButtonComponent, setButtonComponent] = useState(<div></div>);
  const [name, setName] = useState("Default name");
  const [myUser, setMyUser] = useState();
  const [profile, setProfile] = useState();
  const history = useHistory();
  const { id } = useParams();

  const renderProfilePosts = () => {
    // return posts.map(({ imageUrl }, index) => {
    //   return (
    //     <PostContainer key={index}>
    //       <img src={imageUrl} alt="post"></img>
    //       <ActionBar>
    //         {/* <TextBox>{!likes ? "0" : likes.length}</TextBox>  */}
    //         <HeartFilledRed />
    //         {/* <TextBox>{!timestamp ? "0" : timestamp.length}</TextBox>  */}
    //         <CommentImg />
    //       </ActionBar>
    //     </PostContainer>
    //   );
    // });
  };

  async function setButton(user, userProfile) {
    if (userProfile == user) {
      setFollowState("Edit profile");
      setButtonComponent(ButtonWithTrigger());
    } else if (userProfile == id) {
      await db
        .collection("users")
        .doc(user)
        .get()
        .then((myProfile) => {
          if (myProfile.exists) {
            setButtonComponent(ButtonWithoutTrigger());
            if (myProfile.data().following.includes(userProfile))
              setFollowState("Unfollow");
            else setFollowState("Follow");
          } else setFollowState("Login needed");
        });
    }
    return followState;
  }

  async function ManageFollow() {
    if (followState === "Follow") {
      const userColl = await db.collection("users");
      userColl.doc(profile).update({
        followers: firebase.firestore.FieldValue.arrayUnion(myUser.displayName),
      });

      userColl.doc(myUser.displayName).update({
        following: firebase.firestore.FieldValue.arrayUnion(profile),
      });

      setFollowersNumber((no) => no + 1);
      setFollowState("Unfollow");
    } else if (followState === "Unfollow") {
      const userColl = await db.collection("users");
      userColl.doc(profile).update({
        followers: firebase.firestore.FieldValue.arrayRemove(
          myUser.displayName
        ),
      });

      userColl.doc(myUser.displayName).update({
        following: firebase.firestore.FieldValue.arrayRemove(profile),
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
            setDescription(myUserTemp.description);
            if (myUserTemp.profilepicture !== "-") {
              setPhotoUrl(ProfileWithPicture(myUserTemp.profilepicture));
            } else setPhotoUrl(ProfileWithoutPicture());
            setName(myUserTemp.firstname + " " + myUserTemp.lastname);
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
  }, [
    myUser,
    profile,
    followState,
    followersNo,
    followingNo,
    description,
    name,
  ]);

  const ButtonWithTrigger = () => {
    return (
      <Popup
        trigger={
          <FollowButton onClick={ManageFollow}>{followState}</FollowButton>
        }
        modal
        nested
      >
        {(closeFct) => (
          <EditProfileModal
            close={closeFct}
            profileUser={profile}
          ></EditProfileModal>
        )}
      </Popup>
    );
  };

  const ButtonWithoutTrigger = () => {
    return <FollowButton onClick={ManageFollow}>{followState}</FollowButton>;
  };

  const ProfileWithPicture = (profileLink) => {
    return <MyAvatar size={128} src={profileLink}></MyAvatar>;
  };

  const ProfileWithoutPicture = () => {
    return <MyAvatar size={128}>{profile?.[0]?.toUpperCase()}</MyAvatar>;
  };

  return (
    <ProfileContainer>
      <ProfileDetails>
        {PhotoComponent}
        <ProfileInfo>
          <UserAndButton>
            <Username>{profile}</Username>
            {ButtonComponent}
          </UserAndButton>
          <ProfileStats>
            <Info>Posts: {posts.length}</Info>
            <Info>Followers: {followersNo}</Info>
            <Info>Following: {followingNo}</Info>
          </ProfileStats>
          <DescDetail>
            <b>{name}</b>
          </DescDetail>
          <DescDetail>{description}</DescDetail>
        </ProfileInfo>
      </ProfileDetails>
      <ProfilePosts>
        {posts.map((post) => (
          <MiniPost key={post.id} {...post} />
        ))}
      </ProfilePosts>
    </ProfileContainer>
  );
}

export default Profile;
