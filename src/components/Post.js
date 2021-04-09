import React, { useState, useMemo, useEffect } from "react";
import { Avatar, Input, Button, Modal } from "antd";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import firebase, { auth, db } from "utils/firebase";
import { useHistory } from "react-router";
import Comment from "components/Comment";
import UserInModal from "components/common/UserInModal";

const PostContainer = styled.div`
  width: 600px;
  border: 1px solid lightgray;
  border-radius: 4px;
  max-height: 1000px;
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
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  :hover {
    color: #666666;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;
    object-fit: contain;
    max-height: 500px;
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

  :hover,
  :focus {
    border-color: none;
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
  //padding: 10px;
  font-size: 15px;
  strong {
    margin-right: 5px;
    margin-left: 10px;
  }
`;

const ActionMenu = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  align-items: flex-start;
  gap: 10px;
  svg {
    cursor: pointer;
    font-size: 15px;
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

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /* margin-bottom: 5px; */
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

const SeeMore = styled.span`
  font-weight: 600;
  margin-left: 10px;
  margin-top: 40px;
  margin-bottom: 40px;
  cursor: pointer;
  :hover {
    color: #8c8c8c;
  }
`;

function Post({ id, username, imageUrl, caption }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [PhotoComponent, setPhotoUrl] = useState();
  const history = useHistory();
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();
  const [openedLikesModal, setOpenedLikesModal] = useState(false);
  const [openedCommentsModal, setOpenedCommentsModal] = useState(false);

  const ProfileWithPicture = (profileLink) => {
    return <Avatar alt={username} src={profileLink}></Avatar>;
  };

  const ProfileWithoutPicture = () => {
    return <Avatar alt={username}>{username?.[0]?.toUpperCase()}</Avatar>;
  };

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

  useEffect(() => {
    const users = db.collection("users");
    if (username) {
      users?.where("username", "==", username).onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const myUserTemp = snapshot.docs[0].data();
          if (myUserTemp.profilepicture !== "-") {
            setPhotoUrl(ProfileWithPicture(myUserTemp.profilepicture));
          } else setPhotoUrl(ProfileWithoutPicture());
        }
      });
    }
  }, [PhotoComponent]);

  const handlePostLike = async () => {
    if (!!alreadyLiked) {
      await postLikesCollection.doc(alreadyLiked.id).delete();
    } else {
      postLikesCollection.add({
        username: auth.currentUser.displayName,
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
      postUser: username,
      postId: id,
    });

    setCommentText("");
  };

  const handleDeleteComment = async (commentId) => {
    await postCommentsCollection.doc(commentId).delete();
  };

  function activateRedirect() {
    history.push(`/${"profile/"}` + username);
  }

  const ShowDeleteButton = (comm) => {
    if (
      auth.currentUser?.displayName === comm.username ||
      auth.currentUser?.displayName === username
    )
      return (
        <ActionButton onClick={() => handleDeleteComment(comm.id)}>
          <DeleteOutlined />
        </ActionButton>
      );
  };

  return (
    <PostContainer>
      <PostHeader>
        {PhotoComponent}
        <UsernameText onClick={activateRedirect}>{username}</UsernameText>
      </PostHeader>
      <ImageContainer>
        <img src={imageUrl} alt="Post" />
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
        <ActionButton
          onClick={() => comments.length > 0 && setOpenedCommentsModal(true)}
        >
          <strong>
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </strong>
        </ActionButton>
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
      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      {comments.slice(0, 2).map((comment) => (
        <CommentContainer key={comment.id}>
          <div>
              <strong>{comment.username}</strong>
            {comment.commentText}
          </div>
          {ShowDeleteButton(comment)}
        </CommentContainer>
      ))}
      {comments.length > 2 && (
        <SeeMore
          onClick={() => comments.length > 2 && setOpenedCommentsModal(true)}
        >
          See more comments...
        </SeeMore>
      )}
      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          maxLength={200}
        ></CommentInput>
        <PostButton type="text" onClick={handlePostComment}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
}

export default Post;
