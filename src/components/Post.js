import React, { useState, useEffect } from "react";
import { Avatar, Input, Button } from "antd";
import styled from "styled-components";
import { db } from "utils/firebase";
import { useHistory } from "react-router";

const PostContainer = styled.div`
  width: 600px;
  border: 1px solid lightgray;
  border-radius: 4px;
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
  cursor: pointer;
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
  padding: 10px;
  strong {
    margin-right: 5px;
  }
`;

function Post({ username, avatarUrl, imageUrl, caption }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [PhotoComponent, setPhotoUrl] = useState();
  const history = useHistory();

  const ProfileWithPicture = (profileLink) => {
    return <Avatar alt={username} src={profileLink}></Avatar>;
  };

  const ProfileWithoutPicture = () => {
    return <Avatar alt={username}>{username?.[0]?.toUpperCase()}</Avatar>;
  };

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

  const handlePostComments = () => {
    setComments((prevComments) => {
      return [...prevComments, commentText];
    });
  };

  function activateRedirect() {
    history.push(`/${"profile/"}` + username);
  }

  return (
    <PostContainer>
      <PostHeader>
        {/* <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toUpperCase()}
        </Avatar> */}
        {PhotoComponent}
        <UsernameText onClick={activateRedirect}>{username}</UsernameText>
      </PostHeader>

      <ImageContainer>
        <img src={imageUrl} alt="Post" />
      </ImageContainer>

      <Caption>
        <strong>{username}</strong>
        {caption}
      </Caption>
      {comments.map((comment, index) => (
        <div key={comment + index}>{comment}</div>
      ))}

      <AddCommentContainer>
        <CommentInput
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        ></CommentInput>
        <PostButton type="text" onClick={handlePostComments}>
          Post
        </PostButton>
      </AddCommentContainer>
    </PostContainer>
  );
}

export default Post;
