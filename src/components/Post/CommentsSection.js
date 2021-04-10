import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

import TextButton from "components/common/TextButton";
import { auth, db } from "utils/firebase";

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

function CommentsSection({ postCommentsCollection, postId, postAuthorId }) {
  const [comments, setComments] = useState([]);

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
        <strong>{comment.username}</strong>
        {comment.commentText}
      </div>
      {canDeleteComment(comment.userid) ? (
        <TextButton onClick={() => handleDeleteComment(comment.id)}>
          <DeleteOutlined />
        </TextButton>
      ) : null}
    </CommentContainer>
  ));
}

export default CommentsSection;
