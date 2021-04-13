import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCompass,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import DropDownMenu from "../DropDownMenu";
import instaLogo from "../../assets/instaLogo.png";
import UploadModal from "../UploadPostModal";
import UploadStoryModal from "../UploadStoryModal";
import UploadVideoModal from "../UploadVideoModal";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  background-color: white;
  img {
    height: 40px;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const HeaderRightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 22px;
  margin-left: 20px;
`;

const SearchInput = styled(Input)`
  width: 200px;
`;

const AppContentContainer = styled.div`
  padding: 24px 0;
  height: 100%;
  width: 100%;
`;

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppLayout = ({ children }) => {
  const [user, setUser] = useState();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [isOpenedStoryModal, setIsOpenedStoryModal] = useState(false);
  const [isOpenedVideoModal, setIsOpenedVideoModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  const navigateToPage = (linkTo) => {
    history.push(linkTo);
  };

  return (
    <AppContainer>
      <Header>
        <img src={instaLogo} alt="instaLogo" />

        <SearchInput placeholder="Search" />

        <HeaderRightContent>
          <Link to="/home">
            <FontIcon icon={faHome} />
          </Link>
          <FontIcon icon={faPaperPlane} />
          <FontIcon icon={faCompass} />
          <FontIcon icon={faHeart} />
          <DropDownMenu
            username={user?.displayName}
            avatarUrl={user?.photoURL}
            openUploadModal={() => setIsOpenedModal(true)}
            openUploadStoryModal={() => setIsOpenedStoryModal(true)}
            openUploadVideoModal={() => setIsOpenedVideoModal(true)}
            navigateToPage={navigateToPage}
          ></DropDownMenu>
        </HeaderRightContent>
      </Header>
      <AppContentContainer>
        <AppContent>{children}</AppContent>
      </AppContentContainer>

      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        username={user?.displayName}
        avatarUrl={user?.photoURL}
      />
      <UploadStoryModal
        isOpenStoryModal={isOpenedStoryModal}
        setIsOpenStoryModal={setIsOpenedStoryModal}
        username={user?.displayName}
        avatarUrl={user?.photoURL}
      />
      <UploadVideoModal
        username={user?.displayName}
        avatarUrl={user?.photoURL}
        isOpenedVideoModal={isOpenedVideoModal}
        setIsOpenedVideoModal={setIsOpenedVideoModal}
      />
    </AppContainer>
  );
};

export default AppLayout;
