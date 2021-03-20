import React from "react";
import { auth } from "utils/firebase";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

const Username = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

function ValidMenu(isLoggedIn, openUploadModal, navigateToProfile) {
  const history = useHistory();
  if (isLoggedIn)
    return (
      <Menu>
        <Menu.Item
          key="myProfile"
          onClick={() => {
            history.push(`/${"myprofile"}`);
          }}
        >
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
    <Menu>
      <Menu.Item
        key={"login"}
        onClick={() => {
          history.push(`/${"login"}`);
        }}
      >
        Login
      </Menu.Item>
      <Menu.Item
        key={"signup"}
        onClick={() => {
          history.push(`/${"signup"}`);
        }}
      >
        Register
      </Menu.Item>
    </Menu>
  );
}

function DropFownMenu({ username, openUploadModal, isLoggedIn }) {
  const menu = ValidMenu(isLoggedIn, openUploadModal);

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Username>{username}</Username>
    </Dropdown>
  );
}

export default DropFownMenu;
