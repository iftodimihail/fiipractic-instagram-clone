import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const UsernameText = styled.a`
  font-weight: 600;
  margin-left: 10px;
  color: inherit;

  :hover {
    color: inherit;
    text-decoration: underline;
  }
`;

function Header({ username, avatarUrl }) {
  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  return (
    <PostHeader>
      <a
        href={`/profile/${username}`}
        onClick={(e) => navigateToPage(e, "/profile/" + username)}
      >
        <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
      </a>
      <UsernameText
        href={`/profile/${username}`}
        onClick={(e) => navigateToPage(e, "/profile/" + username)}
      >
        {username}
      </UsernameText>
    </PostHeader>
  );
}

export default Header;
