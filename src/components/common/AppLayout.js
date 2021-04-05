import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import { auth } from "utils/firebase";
import DropDownMenu from "components/DropDownMenu";
import UploadModal from "components/UploadModal";
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
  justify-content: flex-end;
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
const AppContentContainer = styled.div`
  padding: 24 px 0;
  height: 100%;
`;
const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function AppLayout({ children }) {
  const [user, setUser] = useState();
  const history = useHistory();
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const navigateToPage = (linkTo) => {
    history.push(linkTo);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
        <DropDownMenu
          username={user?.displayName}
          openUploadModal={() => setIsOpenedModal(true)}
          navigateToPage={navigateToPage}
        />
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
    </AppContainer>
  );
}
export default AppLayout;
