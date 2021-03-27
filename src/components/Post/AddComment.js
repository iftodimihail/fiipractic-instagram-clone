import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Input, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid lightgray;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  padding: 10px 50px 10px 10px;

  :hover,
  :focus {
    border-color: lightgray;
    box-shadow: none;
  }
`;

const PostButton = styled(Button)`
  width: auto;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;

const EmojiButton = styled(SmileOutlined)`
  cursor: pointer;
  padding-right: 10px;
  font-size: 20px;
  color: "#666666";
`;

const AddComment = ({ handlePostCommentCallback }) => {
  const [commentText, setCommentText] = useState("");

  const handlePostComment = () => {
    handlePostCommentCallback(commentText);
    setCommentText("");
  };

  return (
    <AddCommentContainer>
      {/* input */}
      <CommentInput
        size="large"
        value={commentText}
        placeholder="Adauga un comentariu"
        prefix={<EmojiButton />}
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
