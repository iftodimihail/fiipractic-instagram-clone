import React, { useState } from "react";
import firebase, { auth } from "utils/firebase";
import styled from "styled-components";
import { Input, Button } from "antd";

const AddCommentContainer = styled.form`
  position: relative;
  display: flex;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 55px 10px 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  :hover,
  :focus {
    border-color: lightgray;
    box-shadow: none;
  }
`;

const PostButton = styled(Button)`
  position: absolute;
  color: #0095f6;
  font-weight: 600;
  right: 0;
  padding: 0 16px 0 5px;
  height: 100%;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;

function AddComment({ postCommentsCollection }) {
  const [commentText, setCommentText] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    postCommentsCollection.add({
      userid: auth.currentUser.uid,
      commentText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setCommentText("");
  };

  return (
    <AddCommentContainer>
      <CommentInput
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      <PostButton
        type="text"
        htmlType="submit"
        onClick={handlePostComment}
        disabled={!commentText.trim()}
      >
        Post
      </PostButton>
    </AddCommentContainer>
  );
}

export default AddComment;
