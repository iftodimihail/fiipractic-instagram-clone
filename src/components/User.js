import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar} from "antd";

const UserComponent = styled.div`
  background-color: #fafafa;
  height: 80px;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  :hover{
    background-color: #e6e6e6;
  }
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  min-width: 60px;
  height: 60px;
  margin-left: 5px;
  margin-right: 10px;

  span {
    font-size: 60px;
  }
`;

const InfoComponent = styled.div`
  margin: 10px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NameComponent = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const DescriptionComponent = styled.div`
    font-size: 13px;
`

function User({ username, firstname, lastname, profilepicture, description }) {
  return (
    <UserComponent>
      <MyAvatar src={profilepicture && profilepicture}>
        {username[0].toUpperCase()}
      </MyAvatar>
      <InfoComponent>
        <NameComponent>{firstname} {lastname}</NameComponent>
        <DescriptionComponent>{description}</DescriptionComponent>
      </InfoComponent>
    </UserComponent>
  );
}

export default User;
