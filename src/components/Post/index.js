import React, { useMemo } from "react";
import styled from "styled-components";
import { db } from "utils/firebase";

import Header from "./Header";
import ActionMenu from "./ActionMenu";
import CommentsSection from "./CommentsSection";
import AddComment from "./AddComment";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 20px;
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

const Caption = styled.div`
  padding: 10px;

  strong {
    margin-right: 5px;
  }
`;

function Post({ id, username, avatarUrl, imageUrl, caption }) {
  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  return (
    <PostContainer>
      <Header username={username} avatarUrl={avatarUrl} />
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu postId={id} />
      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      <CommentsSection postCommentsCollection={postCommentsCollection} />
      <AddComment postCommentsCollection={postCommentsCollection} />
    </PostContainer>
  );
}

export default Post;
