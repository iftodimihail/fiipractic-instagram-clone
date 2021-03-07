import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const AddPostContainer = styled.div`
  margin: 12px;
  border: 1px solid lightgray;
  position: absolute;
  right: 0;
  top: 5%;
`;

const ContainerTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;

function AddPost(props) {
  const [postUsername, setPostUsername] = useState("");

  const onTrigger = (event) => {
    props.parentCallback(postUsername);
    setPostUsername("");
  };

  return (
    <AddPostContainer>
      <ContainerTitle className="text-center">
        Add a new post! :)
      </ContainerTitle>
      {/* user name input */}
      <Input
        placeholder="Provide username"
        onChange={(event) => setPostUsername(event.target.value)}
      />
      {/* add button */}
      <Button onClick={onTrigger}>Add Post</Button>
    </AddPostContainer>
  );
}

export default AddPost;
