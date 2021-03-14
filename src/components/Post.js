import { Avatar } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 10px;
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
  img {
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
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;
  :hover,
  :focus {
    border-color: transparent;
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

function Post({ username, avatarUrl, imageUrl, caption }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const HandlePostComment = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });
    setCommentText("");
  };
  return (
    <PostContainer>
      {/*  Header */}
      <PostHeader>
        <Avatar alt={username} src={avatarUrl}>
          {username[0].toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </PostHeader>
      {/*  Image */}
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      {caption}
      {/*  Nr of likes */}
      {/*  Comments Section */}
      {/*  Add Comment */}
      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}
      <AddCommentContainer>
        {/* Input */}
        <CommentInput
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onPressEnter={HandlePostComment}
        />
        {/* Button */}
        <PostButton type="text" onClick={HandlePostComment}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
}

export default Post;
