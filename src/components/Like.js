import React, { useEffect, useState } from "react";
import firebase, { auth, db } from "utils/firebase";
import { Avatar } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

const UserLikeContainer = styled.div`
  strong {
    margin-left: 10px;
  }
  margin-bottom: 16px;
`;

const UsernameText = styled.span`
  font-weight: 600;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: #666666;
  }
`;

const Like = ({ username }) => {
  const [avatar, getPhotoSrcByUsername] = useState();
  const history = useHistory();

  useEffect(() => {
    const users = db.collection("users");
    if (username) {
      users?.where("username", "==", username).onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const myUserTemp = snapshot.docs[0].data();
          getPhotoSrcByUsername(myUserTemp.profilepicture);
        }
      });
    }
  }, [avatar]);

  function redirectToProfile() {
    history.push(`/${"profile/"}` + username);
    
  }

  return (
    <UserLikeContainer>
      <Avatar src={avatar && avatar}>{username[0].toUpperCase()}</Avatar>
      <UsernameText onClick={redirectToProfile}>{username}</UsernameText>
    </UserLikeContainer>
  );
};

export default Like;
