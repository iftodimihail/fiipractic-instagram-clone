import Avatar from "antd/lib/avatar/avatar";
import { React, useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  margin: 12px;
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
    color: #5094ce;
  }
`;

function Post({ username = "Tiberiu", avatarUrl, imageUrl = instagramLogo }) {
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
      {/* Header */}
      <PostHeader>
        <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </PostHeader>
      {/* image */}
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      {/* action menu */}
      {/* nr of likes */}
      {/* comment section */}
      {/* add comment */}
      {comments.map((comment, index) => (
        <div key={comments + index}>{comment}</div>
      ))}
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
