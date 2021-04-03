import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";

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

function Header({ username, avatarUrl }) {
  return (
    <PostHeader>
      <Avatar alt={username} src={avatarUrl}>
        {username?.[0]?.toUpperCase()}
      </Avatar>
      <UsernameText>{username}</UsernameText>
    </PostHeader>
  );
}

export default Header;
