import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Input, Button, Modal } from "antd";
import styled from "styled-components";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import firebase, { auth, db } from "utils/firebase";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 20px;
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

  img {
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
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  :hover,
  :focus {
    border-color: lightgray;
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

const Caption = styled.div`
  padding: 10px;

  strong {
    margin-right: 5px;
  }
`;

const ActionMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: flex-start;

  svg {
    cursor: pointer;
    font-size: 20px;
  }
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

const HeartFilledRed = styled(HeartFilled)`
  color: #fd1d1d;
`;

const UserLikeContainer = styled.div`
  strong {
    margin-left: 10px;
  }

  margin-bottom: 16px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 5px;

  strong {
    margin-right: 10px;
  }

  svg {
    display: none;
  }

  :hover {
    svg {
      display: block;
    }
  }
`;

function Post({ id, username, avatarUrl, imageUrl, caption }) {
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [openedLikesModal, setOpenedLikesModal] = useState(false);

  const postLikesCollection = useMemo(
    () => db.collection("posts").doc(id).collection("likes"),
    [id]
  );

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  useEffect(() => {
    postCommentsCollection.orderBy("timestamp").onSnapshot((snapshot) => {
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

  const handlePostComment = () => {
    if (!commentText.trim()) {
      return;
    }

    postCommentsCollection.add({
      username: auth.currentUser.displayName,
      commentText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setCommentText("");
  };

  const handleDeleteComment = async (commentId) => {
    await postCommentsCollection.doc(commentId).delete();
  };

  return (
    <PostContainer>
      <PostHeader>
        <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </PostHeader>
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu>
        <ActionButton onClick={handlePostLike}>
          {alreadyLiked?.username === auth.currentUser?.displayName ? (
            <HeartFilledRed />
          ) : (
            <HeartOutlined />
          )}
        </ActionButton>
        <ActionButton
          onClick={() => likes.length > 0 && setOpenedLikesModal(true)}
        >
          <strong>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </strong>
        </ActionButton>
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
      </ActionMenu>
      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      {comments.map((comment) => (
        <CommentContainer key={comment.id}>
          <div>
            <strong>{comment.username}</strong>
            {comment.commentText}
          </div>
          <ActionButton onClick={() => handleDeleteComment(comment.id)}>
            <DeleteOutlined />
          </ActionButton>
        </CommentContainer>
      ))}
      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <PostButton
          type="text"
          onClick={handlePostComment}
          disabled={!commentText.trim()}
        >
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
}

export default Post;
