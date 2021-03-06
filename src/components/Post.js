import { Avatar, Input, Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
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

  > img {
    width: 100%;
    object-fit: contain;
  }
`;
const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  padding: 10px 50px 10px 10px;
  border-top: 1 px solid lightgraay;
  :hover,
  :focus {
    border-color: none;
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
    color: #5894ce;
  }
`;

function Post({ username, avatarUrl, imageUrl = instagramLogo }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handlePostComment = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });
  };

  return (
    <PostContainer>
      {/*Header */}
      <PostHeader>
        <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </PostHeader>
      {/*Image */}
      <ImageContainer>
        <img src={instagramLogo} alt="aa"></img>
      </ImageContainer>
      {/*action menu */}
      {comments.map((comment, index) => (
        <div key={comment}>{comment}</div>
      ))}
      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <PostButton type="text" onClick={handlePostComment}>
          Post
        </PostButton>
      </AddCommentContainer>
      {/*nr of likes */}
      {/*comment section */}
      {/*add comment */}
    </PostContainer>
  );
}

export default Post;
