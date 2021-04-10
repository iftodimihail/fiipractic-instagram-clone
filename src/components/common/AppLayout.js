import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import DropdownMenu from "components/DropdownMenu";
import UploadModal from "components/PostUploadModal";
import { auth, db } from "utils/firebase";
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

  a.logo-link {
    height: 40px;
  }

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
  const [username, setUsername] = useState("");
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snpashot) => {
          if (snpashot.exists) setUsername(snpashot.data().userName);
        });
    });

    return () => unsubscribe();
  }, [user]);

  const navigateToPage = (linkTo, e = null) => {
    if (e) e.preventDefault();
    history.push(linkTo);
  };

  return (
    <AppContainer>
      <Header>
        <a
          className="logo-link"
          href="/"
          onClick={(e) => navigateToPage("/", e)}
        >
          <img src={instagramLogo} alt="instagram logo" />
        </a>
        <DropdownMenu
          username={username}
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
        userid={user?.uid}
      />
    </AppContainer>
  );
}

export default AppLayout;
