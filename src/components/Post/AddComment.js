import React from "react";
import styled from "styled-components";
import { Avatar, Input, Button } from "antd";

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;

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

const AddComment = ({ handlePostComment, commentText, setCommentText }) => {
  return (
    <AddCommentContainer>
      {/* input */}
      <CommentInput
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      {/* post button */}
      <PostButton type="text" onClick={handlePostComment}>
        Post
      </PostButton>
    </AddCommentContainer>
  );
};

export default AddComment;
