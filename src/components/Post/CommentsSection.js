import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { DeleteOutlined } from "@ant-design/icons";

import TextButton from "components/common/TextButton";

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

function CommentsSection({ postId, postCommentsCollection }) {
  const [comments, setComments] = useState([]);

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

  const handleDeleteComment = async (commentId) => {
    await postCommentsCollection.doc(commentId).delete();
  };

  return comments.map((comment) => (
    <CommentContainer key={comment.id}>
      <div>
        <strong>{comment.username}</strong>
        {comment.commentText}
      </div>
      <TextButton onClick={() => handleDeleteComment(comment.id)}>
        <DeleteOutlined />
      </TextButton>
    </CommentContainer>
  ));
}

export default CommentsSection;
