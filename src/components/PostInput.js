import React, { useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";

import { AddCommentContainer, PostButton } from "utils/myStyledComponents";
import { createPost } from "redux/actions";

const AddCommentInput = styled(Input)`
  padding: 10px 50px 10px 10px;
`;

const PostInput = (props) => {
  const [newPost, setNewPost] = useState("");

  return (
    <AddCommentContainer>
      <AddCommentInput
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Username"
      />
      <PostButton
        type="text"
        onClick={() => {
          props.createPost(newPost);
          setNewPost("");
        }}
      >
        Post
      </PostButton>
    </AddCommentContainer>
  );
};

export default connect(null, { createPost })(PostInput);
