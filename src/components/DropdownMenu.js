import React from "react";
import { Dropdown, Menu } from "antd";
import { auth } from "utils/firebase";
import styled from "styled-components";
import { history, useHistory } from "react-router-dom"

const Username = styled.span`
  cursor: pointer;
`;

function DropdownMenu({ username, openUploadModal }) {

  const history = useHistory();

  const navigateToProfile = () => {
      history.push("/profile")
  }

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={navigateToProfile} >
        My Profile
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
