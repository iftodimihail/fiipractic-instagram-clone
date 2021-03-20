import React from "react";
import Header from "components/common/Header";
import styled from "styled-components";

const AppLayoutComponent = styled.div`

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
  return (
    <AppLayoutComponent>
      <Header></Header>
      <AppContentContainer>
        <AppContent> {children} </AppContent>
      </AppContentContainer>
    </AppLayoutComponent>
  );
}

export default AppLayout;
