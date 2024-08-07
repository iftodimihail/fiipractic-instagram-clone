import React from "react";
import { Dropdown, Menu } from "antd";
import { auth } from "utils/firebase";
import styled from "styled-components";

const Username = styled.span`
  cursor: pointer;
`;

function DropdownMenu({ navigateToPage, username, openUploadModal }) {
  const menu = (
    <Menu>
      <Menu.Item key="home" onClick={() => navigateToPage("/")}>
        Home
      </Menu.Item>
      <Menu.Item key="profile" onClick={() => navigateToPage("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="upload" onClick={openUploadModal}>
        Upload
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => auth.signOut()}>
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Username>{username}</Username>
    </Dropdown>
  );
}

export default DropdownMenu;
