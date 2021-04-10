import React, { useState, useEffect, useMemo } from "react";
import { auth, db } from "utils/firebase";
import styled from "styled-components";
import { Avatar, Modal } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
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

const UserLikeContainer = styled.div`
  strong {
    margin-left: 10px;
  }

  margin-bottom: 16px;
`;

const HeartFilledRed = styled(HeartFilled)`
  color: #fd1d1d;
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
      Promise.all(
        snapshot.docs.map(async (doc) => {
          let username = "";
          let avatarUrl = "";

          if (doc.data().userid === auth.currentUser?.uid)
            setAlreadyLiked(doc.id);

          await db
            .collection("users")
            .doc(doc.data().userid)
            .get()
            .then((userDoc) => {
              username = userDoc.data().userName;
              avatarUrl = userDoc.data().profilePicture;
            });

          return {
            id: doc.id,
            ...doc.data(),
            username: username,
            avatarUrl: avatarUrl,
          };
        })
      ).then((docs) => {
        setLikes(docs);
        setAlreadyLiked(
          docs.find((like) => like.userid === auth.currentUser?.uid)
        );
      });
    });
  }, [postLikesCollection]);

  const handlePostLike = async () => {
    if (!!alreadyLiked) {
      await postLikesCollection.doc(alreadyLiked.id).delete();
    } else {
      postLikesCollection.add({
        userid: auth.currentUser.uid,
      });
    }
  };

  return (
    <ActionMenuContainer>
      <TextButton onClick={handlePostLike}>
        {alreadyLiked?.userid === auth.currentUser?.uid ? (
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
          <UserLikeContainer key={like.id}>
            <Avatar src={like.avatarUrl}>
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
