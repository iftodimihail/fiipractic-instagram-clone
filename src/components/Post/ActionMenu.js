import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Avatar, Modal } from "antd";

import { auth, db } from "utils/firebase";

import TextButton from "components/common/TextButton";

const ActionMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: flex-start;
  svg {
    cursor: pointer;
    font-size: 20px;
  }
`;

const HeartFilledRed = styled(HeartFilled)`
  color: #fd1d1d;
`;

const UserLikeContainer = styled.div`
  strong {
    margin-left: 10px;
  }
  margin-bottom: 16px;
`;

function ActionMenu({ postId }) {
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();
  const [openedLikesModal, setOpenedLikesModal] = useState(false);

  const postLikesCollection = useMemo(
    () => db.collection("posts").doc(postId).collection("likes"),
    [postId]
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

  return (
    <ActionMenuContainer>
      <TextButton onClick={handlePostLike}>
        {alreadyLiked?.username === auth.currentUser?.displayName ? (
          <HeartFilledRed />
        ) : (
          <HeartOutlined />
        )}
      </TextButton>
      <TextButton onClick={() => likes.length > 0 && setOpenedLikesModal(true)}>
        <strong>
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </strong>
      </TextButton>
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
    </ActionMenuContainer>
  );
}

export default ActionMenu;
