import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Menu, Dropdown } from "antd";
import styled from "styled-components";

const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
`;

const UsernameText = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const menu = (
  <Menu>
    <Menu.Item key="delete" onClick={console.log("delete")}>
      Delete
    </Menu.Item>
  </Menu>
);

const PostHeader = ({ username, avatarUrl }) => {
  return (
    <PostHeaderContainer>
      <Username>
        <Avatar alt={username} src={avatarUrl}>
          {username[0].toUpperCase()}
        </Avatar>
        <UsernameText>{username}</UsernameText>
      </Username>

      <Dropdown overlay={menu} placement="topRight">
        <FontAwesomeIcon
          icon={faEllipsisH}
          style={{ cursor: "pointer" }}
          trigger={["click"]}
        />
      </Dropdown>
    </PostHeaderContainer>
  );
};

export default PostHeader;
