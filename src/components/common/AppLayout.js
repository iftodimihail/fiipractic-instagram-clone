import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogoNavbar.png";
import NavbarMenu from "components/NavbarMenu";
import UploadModal from "components/PostUploadModal";
import { auth, db } from "utils/firebase";
import { useHistory } from "react-router";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.div`
  height: 54px;
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid lightgray;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a.logo-link {
    height: 40px;
    display: flex;
    align-items: center;
    padding-top: 7px;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  flex: 1;
`;

function AppLayout({ children }) {
  const [user, setUser] = useState();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snpashot) => {
          if (snpashot.exists) {
            setUsername(snpashot.data().userName);
            setUserPhoto(snpashot.data().profilePicture);
          }
        });
    });

    return () => unsubscribe();
  }, [user]);

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  return (
    <AppContainer>
      <Header>
        <div className="container">
          <a
            className="logo-link"
            href="/"
            onClick={(e) => navigateToPage(e, "/")}
          >
            <img src={instagramLogo} alt="instagram logo" />
          </a>
          <NavbarMenu
            username={username}
            userPhoto={userPhoto}
            openUploadModal={() => setIsOpenedModal(true)}
            navigateToPage={navigateToPage}
          />
        </div>
      </Header>
      <AppContent className="container">{children}</AppContent>
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        userid={user?.uid}
      />
    </AppContainer>
  );
}

export default AppLayout;
