import React, { useState, useEffect, useMemo } from "react";
import {
  HeartFilled,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import firebase, { auth, db } from "utils/firebase";
import { Button, Modal } from "antd";
import Comment from "./Comment";
import UserInModal from "./common/UserInModal";

const HeartFilledRed = styled(HeartFilled)`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 5px;
  color: #fd1d1d;
`;

const TextBox = styled.div`
  font-size: 15px;
  margin-top: 8px;
  margin-left: 5px;
  font-weight: bold;
`;

const CommentImg = styled(CommentOutlined)`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 5px;
  font-weight: bold;
`;

const PostContainer = styled.div`
  width: 280px;
  height: 320px;
  margin-bottom: 30px;
  margin-right: 30px;
  :nth-child(3n + 3) {
    margin-right: 0;
  }
  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }
`;

const ActionBarLeft = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  //width: 150px;
`;

const ActionBarRight = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  //width: 100px;
`;

const DeleteIcon = styled(DeleteOutlined)`
  margin-right: 5px;
  margin-top: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ActionMenu = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ActionButton = styled(Button)`
  background: transparent;
  padding: 0;
  color: inherit;
  border: 0;
  box-shadow: none;
  :hover,
  :focus {
    background: transparent;
    color: inherit;
    outline: none;
  }
`;

const LikeText = styled.div`
  font-weight: bold;
  margin-top: 6px;
  font-size: 16px;
`;

function MiniPost({ id, imageUrl, username }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [openedLikesModal, setOpenedLikesModal] = useState(false);
  const [openedCommentsModal, setOpenedCommentsModal] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState();

  const postLikesCollection = useMemo(
    () => db.collection("posts").doc(id).collection("likes"),
    [id]
  );

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  useEffect(() => {
    postCommentsCollection
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, [postCommentsCollection]);

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

  const DeletePost = async () => {
    await db.collection("posts").doc(id).delete();
  };

  const handlePostLike = async () => {
    if (!!alreadyLiked) {
      await postLikesCollection.doc(alreadyLiked.id).delete();
    } else {
      postLikesCollection.add({
        username: auth.currentUser.displayName,
      });
    }
  };

  return (
    <PostContainer>
      <img src={imageUrl} alt="post"></img>
      <ActionMenu>
        <ActionBarLeft>
          <TextBox>{likes.length}</TextBox>
          <ActionButton
            onClick={() => likes.length > 0 && setOpenedLikesModal(true)}
          >
            <HeartFilledRed />
          </ActionButton>

          <TextBox>{comments.length}</TextBox>
          <ActionButton
            onClick={() => comments.length > 0 && setOpenedCommentsModal(true)}
          >
            <CommentImg />
          </ActionButton>
        </ActionBarLeft>
        <ActionBarRight>
          <ActionButton onClick={handlePostLike}>
            {alreadyLiked?.username === auth.currentUser?.displayName
              ? <LikeText>Unlike</LikeText>
              : <LikeText>Like</LikeText>}
          </ActionButton>
          <ActionButton onClick={DeletePost}>
            {auth.currentUser?.displayName === username && <DeleteIcon />}
          </ActionButton>
        </ActionBarRight>
        <Modal
          title="Likes"
          visible={openedLikesModal}
          onCancel={() => setOpenedLikesModal(false)}
          footer={null}
        >
          {likes.map((like) => (
            <UserInModal key={like.id} {...like}></UserInModal>
          ))}
        </Modal>
        <Modal
          title="Comments"
          visible={openedCommentsModal}
          onCancel={() => setOpenedCommentsModal(false)}
          footer={null}
        >
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment}></Comment>
          ))}
        </Modal>
      </ActionMenu>
    </PostContainer>
  );
}

export default MiniPost;
