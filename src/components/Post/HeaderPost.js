import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import DropDownPost from "../DropDownPost";

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const PostUserName = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const HeaderPost = ({
  username,
  avatarUrl,
  postId,
  handleDeletePost,
  setIsOpenedUserModal,
}) => {
  return (
    <PostHeader>
      <div>
        <Avatar alt={username} src={avatarUrl}>
          {username?.[0]?.toLocaleUpperCase()}
        </Avatar>
        <PostUserName>{username}</PostUserName>
      </div>
      <div>
        <DropDownPost
          handleDeletePost={handleDeletePost}
          postId={postId}
          username={username}
          openUserModal={() => setIsOpenedUserModal(true)}
        ></DropDownPost>
      </div>
    </PostHeader>
  );
};

export default HeaderPost;
