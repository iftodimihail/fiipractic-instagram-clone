import React, { useState } from "react";
import { Avatar, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import profile from "../assets/profile.jpg";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin: 30px 0;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const PostUserName = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const ImageContainer = styled.div`
  max-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 100%;
    object-fit: contain;
  }
`;

const Points = styled.div`
  > img {
    width: 20px;
  }
`;

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 20px;
  margin-top: 12px;
  margin-left: 6px;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;

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
    background: transparent;
    color: #0785f2;
  }
`;

const Post = ({ userName, avatarUrl = profile, points, post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handlePostComment = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });
    setCommentText("");
  };

  return (
    <PostContainer>
      <PostHeader>
        <div>
          <Avatar alt={userName} src={avatarUrl}>
            {userName?.[0]?.toLocaleUpperCase()}
          </Avatar>
          <PostUserName>{userName}</PostUserName>
        </div>
        <div>
          <Points>
            <img src={points} alt="points" />
          </Points>
        </div>
      </PostHeader>
      <ImageContainer>
        <img src={post} alt="post" />
      </ImageContainer>
      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}
      <AddCommentContainer>
        <FontIcon icon={faSmile} />
        <CommentInput
          placeholder="Add a comment"
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

export default Post;
