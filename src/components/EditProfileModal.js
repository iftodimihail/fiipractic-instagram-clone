import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import styled from "styled-components";
import { db } from "utils/firebase";

const { TextArea } = Input;

const Item = styled.div`
  div {
    display: inline-block;
    margin-bottom: 3px;
    opacity: 0.9;
    font-weight: 600;
  }

  span {
    color: red;
  }

  & + & {
    margin-top: 10px;
  }
`;

function EditProfileModal({
  title,
  isOpen,
  setIsOpen,
  userid,
  username,
  fullName,
  description,
}) {
  const [usernameState, setUsernameState] = useState(username);
  const [fullNameState, setFullNameState] = useState(fullName);
  const [descriptionState, setDescriptionState] = useState(description);
  const [error, setError] = useState("");

  useEffect(() => {
    setFullNameState(fullName);
    setDescriptionState(description);
  }, [fullName, description]);

  const handleEdit = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("userName", "==", usernameState)
      .get()
      .then((doc) => {
        if (
          (!doc.empty && usernameState !== username) ||
          usernameState.length < 3
        ) {
          setError("This username is already taken / too short.");
          setUsernameState(username);
        } else {
          db.collection("users").doc(userid).set(
            {
              userName: usernameState,
              fullName: fullNameState,
              description: descriptionState,
            },
            { merge: true }
          );
          setIsOpen(false);
          setError("");
          if (usernameState !== username)
            window.location.href = "/profile/" + usernameState;
        }
      });
  };

  return (
    <Modal
      title={title}
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={handleEdit}
    >
      <Item>
        <div>Username</div>
        &nbsp;&nbsp;&nbsp;<span>{error}</span>
        <Input
          placeholder="Username"
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        />
      </Item>
      <Item>
        <div>Name</div>
        <Input
          placeholder="Name"
          value={fullNameState}
          onChange={(e) => setFullNameState(e.target.value)}
        />
      </Item>
      <Item>
        <div>Bio</div>
        <TextArea
          placeholder="Bio"
          value={descriptionState}
          onChange={(e) => setDescriptionState(e.target.value)}
        />
      </Item>
    </Modal>
  );
}

export default EditProfileModal;
