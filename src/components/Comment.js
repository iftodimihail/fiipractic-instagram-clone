import React, { useEffect, useState, useMemo } from "react";
import firebase, { auth, db } from "utils/firebase";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

const UserCommentContainer = styled.div`
  //display: flex;
  align-items: center;
  /* justify-content: space-between; */
  /* justify-content: flex-start; */
  strong {
    margin-left: 10px;
  }
  margin-bottom: 16px;
`;

const UsernameText = styled.span`
    /* display: inline-flex; */
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

const CommentText = styled.span`
    /* display: inline-flex; */
    /* position: absolute; */
  font-weight: 400;
  margin-left: 0px;
  padding-right: 60px;
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: #666666;
  }
`;

const ActionButton = styled(Button)`
  background: transparent;
  position: absolute;
  padding: 0px, 0px, 0px, 10px;
  color: inherit;
  border: 0;
  box-shadow: none;
  right: 20px;
  :hover,
  :focus {
    background: transparent;
    color: inherit;
    outline: none;
  }
`;

const Comment = ({ id, commentText, username, postUser, postId }) => {
  const [avatar, getPhotoSrcByUsername] = useState();
  const history = useHistory();

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(postId).collection("comments"),
    [postId]
  );

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

  const handleDeleteComment = async () => {
    await postCommentsCollection.doc(id).delete();
  };

  const ShowDeleteButton = () => {
    if (
      auth.currentUser?.displayName === username ||
      auth.currentUser?.displayName === postUser
    )
      return (
        <ActionButton onClick={() => handleDeleteComment()}>
          <DeleteOutlined />
        </ActionButton>
      );
  };

  return (
    <UserCommentContainer>
      <Avatar src={avatar && avatar}>{username[0].toUpperCase()}</Avatar>
      <UsernameText onClick={redirectToProfile}>{username}</UsernameText>
      <CommentText>{commentText}</CommentText>
      {ShowDeleteButton()}
    </UserCommentContainer>
  );
};

export default Comment;
