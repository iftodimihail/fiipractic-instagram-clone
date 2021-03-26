import React from "react";
import styled from "styled-components";
import AvatarNameRow from "components/AvatarNameRow";

const SidebarContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const MyRow = styled(AvatarNameRow)`
  font-size: 20px;
`;

const Sidebar = ({ username }) => {
  return (
    <SidebarContainer>
      <MyRow
        username={username}
        avatarUrl=""
        textTop={username}
        textBottom={username}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
