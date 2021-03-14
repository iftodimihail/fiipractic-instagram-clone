import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";

import {
  AddCommentContainer,
  CommentInput,
  PostButton,
} from "utils/myStyledComponents";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin: 10px 0;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const UsernameText = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;
    object-fit: contain;
  }
`;

const Caption = styled.div`
  padding: 10px;

  strong {
    margin-right: 10px;
  }
`;

const Post = (props) => {
  const [commentText, setCommentText] = useState("");

  const { username, caption, avatarUrl, imageUrl } = props;

  return (
    <PostContainer>
      {/* Header */}

      <PostHeader>
        <Avatar alt={username} src={avatarUrl}>
          {username[0].toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </PostHeader>

      {/* Image */}

      <ImageContainer>
        <img src={imageUrl} alt="Post content" />
      </ImageContainer>

      {/* Action menu */}
      {/* Likes */}
      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      {/* Comment section */}

      {/* Add comment */}

      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <PostButton type="text" onClick={() => {}}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
};

export default Post;
