import React from "react";
import { auth } from "utils/firebase";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";

const Username = styled.span`
  cursor: pointer;
`;

function PushText(str) {
  if (str == "login") return "Login";
  if (str == "signup") return "Register";
  return null;
}

function LogInOut(isLogged, createLogout, item) {
  const history = useHistory();
  if (isLogged && createLogout) {
    return (
      <Menu.Item key="logout" onClick={() => auth.signOut()}>
        Sign out
      </Menu.Item>
    );
  } else if (!isLogged)
    return (
      <Menu.Item
        key={item}
        onClick={() => {
          history.push(`/${item}`);
        }}
      >
        {PushText(item)}
      </Menu.Item>
    );
}

function ValidMenu(isLoggedIn, openUploadModal) {
  const history = useHistory();
  if (isLoggedIn)
    return (
      <Menu>
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
