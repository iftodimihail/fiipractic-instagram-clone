import React from "react";
import DropdownMenu from "components/DropdownMenu";
import instagramLogo from "assets/instaLogo.png";
import { Input } from "antd";
import styled from "styled-components";

const Header = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;

  z-index: 10;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const { Search } = Input;

const SearchField = styled(Search)`
  max-width: 300px;
  width: 30%;
`;

const Navbar = ({ username, setIsOpen }) => {
  return (
    <Header>
      <Container>
        <img src={instagramLogo} alt="instagram logo" />
        <SearchField
          placeholder="input search text"
          allowClear
          onSearch={() => console.log("da")}
        />
        <DropdownMenu
          username={username}
          openUploadModal={() => setIsOpen(true)}
        />
      </Container>
    </Header>
  );
};

export default Navbar;
