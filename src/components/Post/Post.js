import React, { useState } from "react";
import PostHeader from "components/Post/PostHeader";
import ActionMenu from "components/Post/ActionMenu";
import AddComment from "components/Post/AddComment";
import styled from "styled-components";

const PostContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 40px;
  background-color: white;
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

function Post({ username, avatarUrl, imageUrl }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // ["coment 1", "comment2"];
  const handlePostComment = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });

    setCommentText("");
  };

  return (
    <PostContainer>
      {/* Header */}
      <PostHeader username={username} avatarUrl={avatarUrl} />
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu />

      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}
      <AddComment
        handlePostComment={(handlePostComment, commentText, setCommentText)}
      />
    </PostContainer>
  );
}

export default Post;
