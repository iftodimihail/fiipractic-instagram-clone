import React from "react";
import { Avatar } from "antd";
import { auth } from "utils/firebase";
import styled from "styled-components";
import {
  HomeOutlined,
  MessageOutlined,
  CompassOutlined,
  UploadOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;

  > * + * {
    margin-left: 20px;
  }

  a,
  a:hover {
    color: inherit;
  }

  .profile-link {
    display: flex;
  }
`;

function DropdownMenu({
  navigateToPage,
  username,
  userPhoto,
  openUploadModal,
}) {
  return (
    <NavbarMenu>
      <a href="/" onClick={(e) => navigateToPage(e, "/")}>
        <HomeOutlined />
      </a>
      <a href="/direct" onClick={(e) => navigateToPage(e, "/direct")}>
        <MessageOutlined />
      </a>
      <a href="/explore" onClick={(e) => navigateToPage(e, "/explore")}>
        <CompassOutlined />
      </a>
      <UploadOutlined key="upload" onClick={openUploadModal} />
      <ExportOutlined key="logout" onClick={() => auth.signOut()} />
      <a
        className="profile-link"
        href={`/profile/${username}`}
        onClick={(e) => navigateToPage(e, "/profile/" + username)}
      >
        <Avatar size={22} src={userPhoto} alt="Profile">
          {username?.[0]?.toUpperCase()}
        </Avatar>
      </a>
    </NavbarMenu>
  );
}

export default DropdownMenu;
