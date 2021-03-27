import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import UploadModal from "components/UploadModal";
import Navbar from "components/Navbar";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: rgba(250, 250, 250, 1);
`;

const ChildrenContainer = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const AppLayout = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <AppContainer>
      {/* header */}
      <Navbar username={props.user?.displayName} setIsOpen={setIsOpenModal} />

      <ChildrenContainer>{props.children}</ChildrenContainer>

      <UploadModal
        isOpened={isOpenModal}
        setIsOpen={setIsOpenModal}
        username={props.user?.displayName}
      />
    </AppContainer>
  );
};

export default AppLayout;
