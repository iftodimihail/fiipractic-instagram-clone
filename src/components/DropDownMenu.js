import React from "react";
import { Dropdown, Menu, Avatar } from "antd";
import { auth } from "utils/firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AvatarIcon = styled(Avatar)`
  cursor: pointer;
  margin: 0 20px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
`;

const DropDownMenu = ({
  username,
  avatarUrl,
  navigateToPage,
  openUploadModal,
  openUploadStoryModal,
  openUploadVideoModal,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="home" onClick={() => navigateToPage("/home")}>
        Home
      </Menu.Item>
      <Menu.Item key="profile" onClick={() => navigateToPage("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="upload" onClick={openUploadModal}>
        Upload a photo
      </Menu.Item>
      <Menu.Item key="uploadVideo" onClick={openUploadVideoModal}>
        Upload a video
      </Menu.Item>
      <Menu.Item key="uploadStory" onClick={openUploadStoryModal}>
        Upload a story
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => auth.signOut()}>
        <Link to="/">Sign Out</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <AvatarIcon src={avatarUrl}>
          {username?.charAt(0).toUpperCase()}
        </AvatarIcon>
      </Dropdown>
    </div>
  );
};

export default DropDownMenu;
