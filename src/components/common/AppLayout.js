import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import DropDownMenu from "components/DropDownMenu";
import UploadModal from "components/uploadModal";
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
   padding: 12px;
   margin-bottom: 10px;
   justify-content: flex-end;
   align-items: center;
   border-bottom: 1px solid lightgrey;
   background-color: white;
   height: 50px;

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
    width: 100%;
    height: 100%;
`;

const AppContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function AppLayout({ displayName, email, children }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const history = useHistory();

    const moveToProfile = () => {
        history.push("/profile");
    }

    return (
        <AppContainer>
            <Header>
                <img src={instagramLogo} alt="" />
                <DropDownMenu username={displayName} openUploadModal={ () => setIsOpenModal(true) } moveToProfile={moveToProfile}/>
            </Header>

            <AppContentContainer>
                <AppContent>
                    {children}
                </AppContent>
            </AppContentContainer>
            <UploadModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} username={displayName}/>
        </AppContainer>
    );
}

export default AppLayout;