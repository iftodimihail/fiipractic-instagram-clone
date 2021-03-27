import React from "react";
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const ActionMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
`;

const ActionPart = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const IconsStyle = {
  fontSize: "27px",
  marginRight: "15px",
  color: "#666666",
};

const ActionMenu = () => {
  return (
    <ActionMenuContainer>
      <ActionPart>
        <HeartOutlined style={IconsStyle} />
        <CommentOutlined style={IconsStyle} />
        <ShareAltOutlined style={IconsStyle} />
      </ActionPart>

      <ActionPart>
        <BookOutlined style={IconsStyle} />
      </ActionPart>
    </ActionMenuContainer>
  );
};

export default ActionMenu;
