import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";
import styled from "styled-components";

const PostHeaderContainer = styled.div`
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

const PostHeader = ({ username, avatarUrl }) => {
  return (
    <PostHeaderContainer>
      <Username>
        <Avatar alt={username} src={avatarUrl}>
          {username[0].toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </Username>

      <FontAwesomeIcon icon={faEllipsisH} />
    </PostHeaderContainer>
  );
};

export default PostHeader;
