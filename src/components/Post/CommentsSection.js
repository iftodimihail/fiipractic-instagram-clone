import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

import TextButton from "components/common/TextButton";
import { auth, db } from "utils/firebase";
import { useHistory } from "react-router";

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 16px;
  margin-bottom: 4px;
  position: relative;
  word-break: break-word;

  a {
    color: inherit;
    font-weight: 600;

    :hover {
      text-decoration: underline;
      color: inherit;
    }
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

const DeleteButton = styled(TextButton)`
  position: relative;
  font-size: 16px;

  ${DeleteOutlined} {
    position: absolute;
    right: 16px;
  }
`;

function CommentsSection({ postCommentsCollection, postAuthorId }) {
  const [comments, setComments] = useState([]);

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  useEffect(() => {
    postCommentsCollection.orderBy("timestamp").onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs.map(async (doc) => {
          let username = "";
          await db
            .collection("users")
            .doc(doc.data().userid)
            .get()
            .then((userDoc) => {
              username = userDoc.data().userName;
            });

          return {
            id: doc.id,
            ...doc.data(),
            username: username,
          };
        })
      ).then(setComments);
    });
  }, [postCommentsCollection]);

  const handleDeleteComment = async (commentId) => {
    await postCommentsCollection.doc(commentId).delete();
  };

  const canDeleteComment = (commentUserId) => {
    if (
      postAuthorId === auth.currentUser.uid ||
      commentUserId === auth.currentUser.uid
    )
      return true;
    return false;
  };

  return comments.map((comment) => (
    <CommentContainer key={comment.id}>
      <div>
        <a
          href={`/profile/${comment.username}`}
          onClick={(e) => navigateToPage(e, "/profile/" + comment.username)}
        >
          {comment.username}
        </a>
        &nbsp;
        {comment.commentText}
      </div>
      {canDeleteComment(comment.userid) ? (
        <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
          <DeleteOutlined />
        </DeleteButton>
      ) : null}
    </CommentContainer>
  ));
}

export default CommentsSection;
