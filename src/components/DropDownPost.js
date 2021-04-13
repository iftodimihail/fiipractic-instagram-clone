import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { auth } from "utils/firebase";

const DropDownPage = ({ handleDeletePost, postId, username }) => {
  const menu = (
    <Menu>
      {username === auth.currentUser?.displayName ? (
        <Menu.Item key="deleteItem" onClick={() => handleDeletePost(postId)}>
          Delete
        </Menu.Item>
      ) : (
        ""
      )}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </Dropdown>
    </div>
  );
};

export default DropDownPage;
