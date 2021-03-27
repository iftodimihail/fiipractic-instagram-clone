import React, { useState } from "react";
import PostHeader from "components/Post/PostHeader";
import ActionMenu from "components/Post/ActionMenu";
import AddComment from "components/Post/AddComment";
import ImageCarousel from "components/Post/ImageCarousel";
import styled from "styled-components";

const PostContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 40px;
  background-color: white;
`;

function Post({ username, avatarUrl, imageUrl }) {
  const [comments, setComments] = useState([]);

  const handlePostComment = (commentText) => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });
  };

  return (
    <PostContainer>
      {/* Header */}
      <PostHeader username={username} avatarUrl={avatarUrl} />

      <ImageCarousel imagesUrl={[imageUrl]} />

      <ActionMenu />

      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}
      <AddComment handlePostCommentCallback={handlePostComment} />
    </PostContainer>
  );
}

export default Post;
