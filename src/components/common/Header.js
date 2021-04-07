import React, { useEffect, useState } from "react";
import DropFownMenu from "components/DropDownMenu";
import instagramLogo from "assets/instaLogo.png";
import styled from "styled-components";
import { auth } from "utils/firebase";
import UploadModal from "components/UploadModal";
import { useHistory } from "react-router";
import {
  HomeOutlined,
  MessageOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const HeaderComponent = styled.div`
  width: 900px;
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  background-color: white;
  img {
    margin-top: 10px;
    height: 40px;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ActionMenu = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  font-size: 25px;
`;
const ActionButton = styled.div`
  margin-right: 15px;
  cursor: pointer;
  :hover{
    color: #4b4c52;
    font-size: 25.3px;
  }
`;

function Header() {
  const [user, setUser] = useState();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    // if (!auth.isLoggedIn) history.push(`/${"login"}`);
    return () => unsubscribe();
  }, [user]);

  const Redirect = (path) => {
    history.push(`/${path}`);
  }

  return (
    <HeaderComponent>
      <ActionMenu>
        <ActionButton onClick={() => Redirect("home")}>
          <HomeOutlined title="Home" />
        </ActionButton>
        <ActionButton onClick={() => Redirect("feed")}>
          <AppstoreOutlined title="News Feed" />
        </ActionButton>
        <ActionButton onClick={() => Redirect("pm")}>
          <MessageOutlined title="Inbox" />
        </ActionButton>
      </ActionMenu>
      <img src={instagramLogo} alt="instagram logo"></img>
      <DropFownMenu
        username={user ? user.displayName : "Menu"}
        openUploadModal={() => setIsOpenedModal(true)}
        isLoggedIn={user ? true : false}
      />
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        username={user?.displayName}
      />
    </HeaderComponent>
  );
}

export default Header;
