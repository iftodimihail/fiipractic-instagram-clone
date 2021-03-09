import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const PostFormContainer = styled.div`
  display: flex;
  padding: 50px;
`;

const PostInput = styled(Input)`
  margin-right: 30px;
`;

const PostButton = styled(Button)``;

function PostForm({ addNewPost }) {
  const [username, setUsername] = useState("");

  const handleAddPost = () => {
    if (username !== "") {
      addNewPost(username);
      setUsername("");
    }
  };

  return (
    <PostFormContainer>
      <PostInput
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></PostInput>
      <PostButton onClick={handleAddPost}>Add post</PostButton>
    </PostFormContainer>
  );
}

export default PostForm;
