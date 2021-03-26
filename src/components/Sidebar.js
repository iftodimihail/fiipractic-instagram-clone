import React from "react";
import styled from "styled-components";
import AvatarNameRow from "components/AvatarNameRow";

const SidebarContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const MyRow = styled(AvatarNameRow)`
  display: none;
`;

const SectionTitle = styled.p`
  color: grey;
  margin-top: 20px;
  font-weight: bold;
`;

const Sidebar = ({ username }) => {
  return (
    <SidebarContainer>
      <MyRow
        username={username}
        avatarUrl=""
        textTop={username}
        textBottom={username}
        size={60}
      />
      <SectionTitle>Sugestii pentru tine</SectionTitle>
      <AvatarNameRow
        username={username}
        avatarUrl=""
        textTop={username}
        textBottom={username}
      />
      <AvatarNameRow
        username={username}
        avatarUrl=""
        textTop={username}
        textBottom={username}
      />
      <AvatarNameRow
        username={username}
        avatarUrl=""
        textTop={username}
        textBottom={username}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
