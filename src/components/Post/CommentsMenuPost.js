import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import firebase, { auth } from "utils/firebase";

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 20px;
  margin-top: 12px;
  margin-left: 6px;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  padding: 10px 50px 10px 10px;
`;

const CommentModal = styled(Modal)`
  max-height: 80%;
  overflow-y: auto;
`;

const PostButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 5px;
  height: 100%;

  :hover,
  :focus {
    background: transparent;
    color: #0785f2;
  }
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

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: -2px;
  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    max-width: 90%;
  }
  strong {
    margin-right: 10px;
  }
  svg {
    display: none;
  }
  :hover {
    svg {
      display: block;
      margin-top: -10px;
      font-size: 17px;
      color: grey;
    }
  }
  :focus {
    border: grey;
  }
`;

const ViewAllComments = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 10px;
  color: gray;
  cursor: pointer;
`;

const ContainComment = styled.div`
  overflow-x: scroll;
`;

const CommentsMenuPost = ({
  handleDeleteComment,
  postCommentsCollection,
  comments,
  setOpenedCommentsModal,
  openedCommentsModal,
}) => {
  const [commentText, setCommentText] = useState("");

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
  return (
    <div>
      {comments.length > 4 ? (
        <ViewAllComments
          onClick={() => comments.length > 0 && setOpenedCommentsModal(true)}
        >
          View all {comments.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </ViewAllComments>
      ) : (
        ""
      )}
      {comments.slice(0, 4).map((comment) => (
        <CommentContainer key={comment.id}>
          <div>
            <strong>{comment.username}</strong>
            <ContainComment>{comment.commentText}</ContainComment>
          </div>
          <ActionButton onClick={() => handleDeleteComment(comment.id)}>
            {comment.username === auth.currentUser?.displayName ? (
              <FontIcon icon={faTrashAlt} style={{ marginTop: -1 }} />
            ) : (
              <></>
            )}
          </ActionButton>
        </CommentContainer>
      ))}
      <AddCommentContainer>
        <FontIcon icon={faSmile} />
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Add a comment"
        />
        <PostButton
          type="text"
          onClick={handlePostComment}
          disabled={!commentText.trim()}
        >
          Post
        </PostButton>
      </AddCommentContainer>
      <CommentModal
        title="Comments"
        visible={openedCommentsModal}
        onCancel={() => setOpenedCommentsModal(false)}
        footer={null}
      >
        {comments.map((comment) => (
          <CommentContainer key={comment.id}>
            <div>
              <strong>{comment.username}</strong>
              <ContainComment>{comment.commentText}</ContainComment>
            </div>
            <ActionButton onClick={() => handleDeleteComment(comment.id)}>
              {comment.username === auth.currentUser?.displayName ? (
                <FontIcon icon={faTrashAlt} />
              ) : (
                <></>
              )}
            </ActionButton>
          </CommentContainer>
        ))}
      </CommentModal>
    </div>
  );
};

export default CommentsMenuPost;
