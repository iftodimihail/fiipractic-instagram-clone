import React, { useEffect, useState } from "react";
import DropFownMenu from "components/DropDownMenu";
import instagramLogo from "assets/instaLogo.png";
import styled from "styled-components";
import { auth } from "utils/firebase";
import UploadModal from "components/UploadModal";
import { useHistory } from "react-router";

const HeaderComponent = styled.div`
  width: 900px;
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

  return (
    <HeaderComponent>
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
