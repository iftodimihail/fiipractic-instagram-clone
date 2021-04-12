import React, { useMemo, useState, useEffect } from "react";
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

  & + & {
    margin-top: 40px;
  }
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

function Post({ id, userid, imageUrl, caption }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  useEffect(() => {
    db.collection("users")
      .doc(userid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setUsername(snapshot.data().userName);
          setProfilePicture(snapshot.data().profilePicture);
        }
      });
  });

  return (
    <PostContainer>
      <Header username={username} avatarUrl={profilePicture} />
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu postId={id} />
      {caption ? (
        <Caption>
          <strong>{username}</strong>
          {caption}
        </Caption>
      ) : null}
      <CommentsSection
        postCommentsCollection={postCommentsCollection}
        postId={id}
        postAuthorId={userid}
      />
      <AddComment postCommentsCollection={postCommentsCollection} />
    </PostContainer>
  );
}

export default Post;
