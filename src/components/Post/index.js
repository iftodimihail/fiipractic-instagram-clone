import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "utils/firebase";

import Header from "./Header";
import ActionMenu from "./ActionMenu";
import CommentsSection from "./CommentsSection";
import AddComment from "./AddComment";
import { useHistory } from "react-router";

const PostContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;

  & + & {
    margin-top: 40px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Caption = styled.div`
  padding: 0 16px;
  margin-bottom: 4px;

  a {
    color: inherit;
    font-weight: 600;

    :hover {
      text-decoration: underline;
      color: inherit;
    }
  }
`;

const Time = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  color: #8e8e8e;
  margin-top: 6px;
  margin-bottom: 10px;
  padding: 0 16px;
`;

function timeSince(timeStamp) {
  let now = new Date();
  let secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return "now";
  }
  if (secondsPast < 3600) {
    if (parseInt(secondsPast / 60) === 1)
      return parseInt(secondsPast / 60) + " minute ago";
    return parseInt(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast < 86400) {
    if (parseInt(secondsPast / 3600) === 1)
      return parseInt(secondsPast / 3600) + " hour ago";
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast < 604800) {
    if (parseInt(secondsPast / 86400) === 1)
      return parseInt(secondsPast / 86400) + " day ago";
    return parseInt(secondsPast / 86400) + " days ago";
  }
  if (secondsPast < 2628000) {
    if (parseInt(secondsPast / 604800) === 1)
      return parseInt(secondsPast / 604800) + " month ago";
    return parseInt(secondsPast / 604800) + " months ago";
  }
  if (parseInt(secondsPast / 2628000) === 1)
    return parseInt(secondsPast / 2628000) + " year ago";
  return parseInt(secondsPast / 2628000) + " years ago";
}

function Post({ id, userid, imageUrl, caption, timestamp }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const postCommentsCollection = useMemo(
    () => db.collection("posts").doc(id).collection("comments"),
    [id]
  );

  useEffect(() => {
    db.collection("users")
      .doc(userid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setUsername(snapshot.data().userName);
          setProfilePicture(snapshot.data().profilePicture);
        }
      });
  });

  return (
    <PostContainer>
      <Header username={username} avatarUrl={profilePicture} />
      <ImageContainer>
        <img src={imageUrl} alt="post" />
      </ImageContainer>
      <ActionMenu postId={id} />
      {caption ? (
        <Caption>
          <a
            href={`/profile/${username}`}
            onClick={(e) => navigateToPage(e, "/profile/" + username)}
          >
            {username}
          </a>
          &nbsp;
          {caption}
        </Caption>
      ) : null}
      <CommentsSection
        postCommentsCollection={postCommentsCollection}
        postId={id}
        postAuthorId={userid}
      />
      <Time>{timeSince(timestamp.toDate())}</Time>
      <AddComment postCommentsCollection={postCommentsCollection} />
    </PostContainer>
  );
}

export default Post;
