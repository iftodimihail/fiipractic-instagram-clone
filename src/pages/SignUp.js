import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Input, Button } from "antd";

import instaLogo from "assets/instaLogo.png";
import { auth } from "utils/firebase";

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  > * {
    margin-bottom: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const Error = styled.span`
  color: red;
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: username,
        });

        history.push("/");
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <CenteredWrap>
      <SignUpContainer>
        <LogoContainer>
          <img src={instaLogo} alt="Instagram Logo" />
        </LogoContainer>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error>{errorMessage}</Error>
        <Button type="primary" onClick={handleSignUp}>
          Sign up
        </Button>
      </SignUpContainer>
    </CenteredWrap>
  );
};

export default SignUp;
