import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { connect } from "react-redux";

import {
  AddCommentContainer,
  CommentInput,
  PostButton,
} from "utils/myStyledComponents";
import instaLogo from "assets/instaLogo.png";
import { postComment } from "redux/actions";

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

const Post = (props) => {
  const [commentText, setCommentText] = useState("");

  const {
    username = "Lucian",
    avatarUrl,
    imageUrl = instaLogo,
    comments,
  } = props.post;

  const handlePostComment = () => {
    props.postComment(username, commentText);
    setCommentText("");
  };

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
      {/* Comment section */}

      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}

      {/* Add comment */}

      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <PostButton type="text" onClick={handlePostComment}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
};

export default connect(null, { postComment })(Post);
