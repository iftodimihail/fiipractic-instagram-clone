import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "antd";

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const NameStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 10px;
`;

const TextTop = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const TextBottom = styled.p`
  font-size: 11px;
  font-weight: normal;
  margin-bottom: 0px;
  color: grey;
`;

const FollowButton = styled(Button)`
  width: auto;
`;

const AvatarNameRow = ({
  username,
  avatarUrl,
  textTop,
  textBottom,
  size = 40,
}) => {
  return (
    <Container>
      <LeftContainer>
        <Avatar size={size} alt={username} src={avatarUrl}>
          {username[0].toUpperCase()}
        </Avatar>
        <NameStatus>
          <TextTop>{textTop}</TextTop>
          <TextBottom>{textBottom}</TextBottom>
        </NameStatus>
      </LeftContainer>
      <FollowButton type="link" block>
        Urmareste
      </FollowButton>
    </Container>
  );
};

export default AvatarNameRow;
