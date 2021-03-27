import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropdownMenu from "components/DropdownMenu";
import UploadModal from "components/UploadModal";
import { auth } from "utils/firebase";
import instagramLogo from "assets/instaLogo.png";
import { useHistory } from "react-router";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
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

function AppLayout({ children }) {
  const [user, setUser] = useState();
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  const history = useHistory();

  const navigateToProfile = () => {
    history.push("/profile");
  };

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
        <DropdownMenu
          navigateToProfile={navigateToProfile}
          username={user?.displayName}
          openUploadModal={() => setIsOpenedModal(true)}
        />
      </Header>
      <AppContentContainer>
        <AppContent>{children}</AppContent>
      </AppContentContainer>
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        username={user?.displayName}
      />
    </AppContainer>
  );
}

export default AppLayout;
