import React, { useState } from "react";
import { Avatar, Input, Button } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faCircle,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faCircle as farCircle,
} from "@fortawesome/free-regular-svg-icons";

const PostContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: 40px;
  background-color: white;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
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

const ActionMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;

const ActionPart = styled.div`
  display: flex;
  align-items: center;
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

function Post({ username, avatarUrl, imageUrl }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // ["coment 1", "comment2"];
  const handlePostComment = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });

    setCommentText("");
  };

  return (
    <PostContainer>
      {/* Header */}
      <PostHeader>
        <Username>
          <Avatar alt={username} src={avatarUrl}>
            {username[0].toUpperCase()}
          </Avatar>
          <UsernameText>{username}</UsernameText>
        </Username>

        <FontAwesomeIcon icon={faEllipsisH} />
      </PostHeader>

      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>

      <ActionMenu>
        <ActionPart>
          <FontAwesomeIcon
            icon={farHeart}
            style={{ marginRight: 5 }}
            size="2x"
            color="red"
          />
          <FontAwesomeIcon icon={faComment} size="2x" color="grey" />
        </ActionPart>

        <ActionPart>
          <FontAwesomeIcon icon={faCircle} style={{ marginRight: 5 }} />
          <FontAwesomeIcon
            icon={faCircle}
            style={{ marginRight: 5 }}
            color="grey"
          />
          <FontAwesomeIcon icon={faCircle} color="grey" />
        </ActionPart>

        <ActionPart>
          <FontAwesomeIcon icon={faBookmark} size="2x" color="gold" />
        </ActionPart>
      </ActionMenu>
      {/* nr of likes */}
      {/* comment section */}
      {/* add comment */}
      {/* add comment */}
      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}
      <AddCommentContainer>
        {/* input */}
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        {/* post button */}
        <PostButton type="text" onClick={handlePostComment}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
}

export default Post;
