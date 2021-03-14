import React from "react";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";

import { auth } from "utils/firebase";

const Username = styled.span`
  cursor: pointer;
`;

const DropdownMenu = ({ username, openUploadModal }) => {
  const menu = (
    <Menu>
      <Menu.Item key="upload" onClick={openUploadModal}>
        Upload
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => auth.signOut()}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Username>{username}</Username>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
