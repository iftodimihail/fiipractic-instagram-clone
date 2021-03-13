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
  }
  else if (!isLogged)
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

function DropFownMenu({ username, openUploadModal, isLogged }) {
  const menu = (
    <Menu>
      <Menu.Item key="upload" onClick={openUploadModal}>
        Upload
      </Menu.Item>
      {LogInOut(isLogged, true, "login")}
      {/* in cazul in care userul e deja logat sa nu creeze de doua ori butonul de logout */}
      {LogInOut(isLogged, false, "signup")}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Username>{username}</Username>
    </Dropdown>
  );
}

export default DropFownMenu;
