import React, { useState } from "react";
import firebase, { auth } from "utils/firebase";
import styled from "styled-components";
import { Input, Button } from "antd";

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;
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
  right: 0;
  padding: 0 10px 0 5px;
  height: 100%;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;

function AddComment({ postCommentsCollection }) {
  const [commentText, setCommentText] = useState("");

  const handlePostComment = () => {
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
        onClick={handlePostComment}
        disabled={!commentText.trim()}
      >
        Post
      </PostButton>
    </AddCommentContainer>
  );
}

export default AddComment;
