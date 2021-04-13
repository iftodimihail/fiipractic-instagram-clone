import React, { useState, useEffect, useMemo } from "react";
import HeaderPost from "./HeaderPost";
import ActionMenu from "./ActionMenu";
import CommentsMenuPost from "./CommentsMenuPost";
// import UserProfileModal from "./UserProfileModal";
import styled from "styled-components";
import { db } from "utils/firebase";

const PostContainer = styled.div`
  width: 600px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin: 30px 0;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.05);
`;

const ImageContainer = styled.div`
  max-height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 100%;
    object-fit: contain;
  }
`;

const Caption = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  strong {
    margin-right: 5px;
  }
`;

const Post = ({ id, username, avatarUrl, imageUrl, caption, postId }) => {
  const [comments, setComments] = useState([]);
  const [openedLikesModal, setOpenedLikesModal] = useState(false);
  const [openedCommentsModal, setOpenedCommentsModal] = useState(false);
  const [openedSavePostsModal, setOpenedSavePostsModal] = useState(false);
  const [isOpenedUserModal, setIsOpenedUserModal] = useState(false);

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  useEffect(() => {
    postCommentsCollection.orderBy("timestamp").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(docs);
    });
  }, [postCommentsCollection]);

  const handleDeleteComment = async (commentId) => {
    await postCommentsCollection.doc(commentId).delete();
  };

  const handleDeletePost = async (postId) => {
    await db.collection("posts").doc(postId).delete();
  };

  return (
    <PostContainer>
      <HeaderPost
        username={username}
        avatarUrl={avatarUrl}
        postId={postId}
        handleDeletePost={handleDeletePost}
        setIsOpenedUserModal={setOpenedLikesModal}
      />
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu
        id={id}
        setOpenedLikesModal={setOpenedLikesModal}
        openedLikesModal={openedLikesModal}
        setOpenedSavePostsModal={setOpenedSavePostsModal}
        openedSavePostsModal={openedSavePostsModal}
      />
      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      <CommentsMenuPost
        handleDeleteComment={handleDeleteComment}
        postCommentsCollection={postCommentsCollection}
        comments={comments}
        openedCommentsModal={openedCommentsModal}
        setOpenedCommentsModal={setOpenedCommentsModal}
      />
    </PostContainer>
  );
};

export default Post;
