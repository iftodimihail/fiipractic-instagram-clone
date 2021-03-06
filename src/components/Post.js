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
  align-items: center;

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
  border-radius: 0px;
  border-top: 1px solid lightgray;
  padding: 10px 50pz 10px 10px;

  :hover,
  :focus {
    border-top-color: #5094ce;
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

function Post({ username = "Roxana", avatarUrl }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handlePostComment = () => {
    setComments((prevComment) => {
      return [...prevComment, commentText];
    });//.then(() => setComments()); // de facut
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
      {/* image */}
      <ImageContainer>
        <img src={instagramLogo} alt="post" />
      </ImageContainer>
      {/* action menu */}
      {/* nr of likes */}
      {/* coment section */}
      {comments.map((comment, index) => (
        <div key={index}>{comment}</div>
      ))}
      {/* add comment */}
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
    </PostContainer>
  );
}

export default Post;
