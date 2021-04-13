import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import firebase, { auth, db } from "utils/firebase";
import { Link } from "react-router-dom";

const SuggestionsContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 20px;
`;

const SuggestionsItem = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const SuggestionsUsersTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: grey;
  margin: 10px 0;
`;

const UserInfo = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: -1px 40px 0 10px;
`;

const UserInfoEmail = styled.div`
  font-size: 12px;
  color: grey;
`;

// const AddToFriends = styled.div`
//   cursor: pointer;
// `;

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  // const [following, setFollowing] = useState([]);

  useEffect(() => {
    db.collection("usernames").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      )
    );
  }, []);

  // useEffect(() => {
  //   db.collection("usernames")
  //     .doc(auth.currentUser?.displayName)
  //     .collection("following")
  //     .onSnapshot((snapshot) =>
  //       setFollowing(
  //         snapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //         }))
  //       )
  //     );
  // }, []);

  // const handleFollowing = (userNameFollower) => {
  //   db.collection("usernames")
  //     .doc(auth.currentUser?.displayName)
  //     .collection("following")
  //     .add({
  //       username: auth.currentUser.displayName,
  //       userNameFollower,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     });
  // };

  const shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return (
    <SuggestionsContainer>
      <SuggestionsItem>
        <Avatar size={48} src={auth.currentUser?.photoURL} />
        <UserInfo>
          <b>{auth.currentUser?.displayName}</b>
          <UserInfoEmail>{auth.currentUser?.email}</UserInfoEmail>
        </UserInfo>
        <Link to="profile">Profile</Link>
      </SuggestionsItem>
      <SuggestionsUsersTitle>
        <b>Suggestions for you</b>
        {/* <div>See al users</div> */}
        <Link to={"/all-users"}>See al users</Link>
      </SuggestionsUsersTitle>
      {shuffleArray(users)
        .slice(0, 5)
        ?.map((user, index) => {
          return (
            <SuggestionsItem key={index}>
              {/* <Avatar size={38} /> */}
              <UserInfo>
                <b>{user.username}</b>
                <UserInfoEmail>{user.email}</UserInfoEmail>
              </UserInfo>
              {/* <AddToFriends onClick={() => handleFollowing(user.username)}>
                Follow
              </AddToFriends> */}
              {/* <div>
                {following.userNameFollower !== user.username ? (
                  <AddToFriends onClick={() => handleFollowing(user.username)}>
                    Follow
                  </AddToFriends>
                ) : (
                  <AddToFriends>Unfollow</AddToFriends>
                )}
              </div> */}
            </SuggestionsItem>
          );
        })}
    </SuggestionsContainer>
  );
};

export default Suggestions;
