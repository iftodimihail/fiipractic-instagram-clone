import React, { useState, useMemo, useEffect } from "react";
import { Avatar, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faBookmark as faBook,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";

const ReactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  margin-right: 10px;

  svg {
    margin: 0 5px;
    margin-top: 11px;
  }
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 20px;
  margin-top: 12px;
  margin-left: 6px;
`;

const NumberOfLikesAndSavePosts = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled(Button)`
  background: transparent;
  padding: 0 10px;
  color: inherit;
  display: flex;
  align-items: flex-start;
  border: 0;
  box-shadow: none;
  :hover,
  :focus {
    background: transparent;
    color: inherit;
    outline: none;
  }
`;

const UserLikeContainer = styled.div`
  strong {
    margin-left: 10px;
  }
  margin-bottom: 16px;
`;

const ActionMenu = ({
  id,
  setOpenedLikesModal,
  openedLikesModal,
  openedSavePostsModal,
  setOpenedSavePostsModal,
}) => {
  const [likes, setLikes] = useState([]);
  const [savePosts, setSavePosts] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();
  const [alreadySavedPost, setAlreadySavedPost] = useState();

  const postLikesCollection = useMemo(
    () => db.collection("posts").doc(id).collection("likes"),
    [id]
  );

  const postSaveCollection = useMemo(
    () => db.collection("posts").doc(id).collection("save"),
    [id]
  );

  useEffect(() => {
    postLikesCollection.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLikes(docs);
      setAlreadyLiked(
        docs.find((like) => like.username === auth.currentUser?.displayName)
      );
    });
  }, [postLikesCollection]);

  const handlePostLike = async () => {
    if (!!alreadyLiked) {
      await postLikesCollection.doc(alreadyLiked.id).delete();
    } else {
      postLikesCollection.add({
        username: auth.currentUser.displayName,
        avatarUrl: auth.currentUser?.photoURL,
      });
    }
  };

  useEffect(() => {
    postSaveCollection.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSavePosts(docs);
      setAlreadySavedPost(
        docs.find((save) => save.username === auth.currentUser?.displayName)
      );
    });
  }, [postSaveCollection]);

  const handlePostSave = async () => {
    if (!!alreadySavedPost) {
      await postSaveCollection.doc(alreadySavedPost.id).delete();
    } else {
      postSaveCollection.add({
        username: auth.currentUser.displayName,
        avatarUrl: auth.currentUser?.photoURL,
      });
    }
  };

  return (
    <div>
      <ReactionsContainer>
        <div>
          {alreadyLiked?.username === auth.currentUser?.displayName ? (
            <FontIcon
              icon={faSolidHeart}
              onClick={handlePostLike}
              style={{ color: "#CE4B56" }}
            />
          ) : (
            <FontIcon icon={faHeart} onClick={handlePostLike} />
          )}
          <FontIcon icon={faComment} />
          <FontIcon icon={faPaperPlane} />
        </div>
        <div>
          {alreadySavedPost?.username === auth.currentUser?.displayName ? (
            <FontIcon
              icon={faBook}
              onClick={handlePostSave}
              style={{ color: "#CE4B56" }}
            />
          ) : (
            <FontIcon icon={faBookmark} onClick={handlePostSave} />
          )}
        </div>
      </ReactionsContainer>
      <NumberOfLikesAndSavePosts>
        <ActionButton
          onClick={() => likes.length > 0 && setOpenedLikesModal(true)}
        >
          <strong>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </strong>
        </ActionButton>
        <ActionButton
          onClick={() => savePosts.length > 0 && setOpenedSavePostsModal(true)}
        >
          <strong>
            {savePosts.length}{" "}
            {savePosts.length === 1
              ? "user saved the post"
              : "users saved the post"}
          </strong>
        </ActionButton>
      </NumberOfLikesAndSavePosts>
      <Modal
        title="Likes"
        visible={openedLikesModal}
        onCancel={() => setOpenedLikesModal(false)}
        footer={null}
      >
        {likes.map((like) => (
          <UserLikeContainer key={like.username}>
            <Avatar src={like?.avatarUrl}>
              {like.username[0].toUpperCase()}
            </Avatar>
            <strong>{like.username}</strong>
          </UserLikeContainer>
        ))}
      </Modal>
      <Modal
        title="Users who saved this post"
        visible={openedSavePostsModal}
        onCancel={() => setOpenedSavePostsModal(false)}
        footer={null}
      >
        {savePosts.map((post) => (
          <UserLikeContainer key={post.username}>
            <Avatar src={post?.avatarUrl}>
              {post.username[0].toUpperCase()}
            </Avatar>
            <strong>{post.username}</strong>
          </UserLikeContainer>
        ))}
      </Modal>
    </div>
  );
};

export default ActionMenu;
