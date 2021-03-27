import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const ActionMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;

const ActionPart = styled.div`
  display: flex;
  align-items: center;
`;

const ActionMenu = () => {
  return (
    <ActionMenuContainer>
      <ActionPart>
        <FontAwesomeIcon
          icon={farHeart}
          style={{ marginRight: 5 }}
          size="2x"
          color="red"
        />
        <FontAwesomeIcon icon={faComment} size="2x" color="grey" />
      </ActionPart>

      <ActionPart>
        <FontAwesomeIcon icon={faCircle} style={{ marginRight: 5 }} />
        <FontAwesomeIcon
          icon={faCircle}
          style={{ marginRight: 5 }}
          color="grey"
        />
        <FontAwesomeIcon icon={faCircle} color="grey" />
      </ActionPart>

      <ActionPart>
        <FontAwesomeIcon icon={faBookmark} size="2x" color="gold" />
      </ActionPart>
    </ActionMenuContainer>
  );
};

export default ActionMenu;
