import React, { useState } from "react";
import styled from "styled-components";
import instaLogo from "assets/instaLogo.png";
import { Input, Button } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  width: 300px;
  border: 1px solid lightgrey;
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

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const hangleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
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
          <img src={instaLogo} alt="insta" />
        </LogoContainer>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error>{errorMessage}</Error>
        <Button type="primary" onClick={hangleSignIn}>
          SignUp
        </Button>
      </SignUpContainer>
    </CenteredWrap>
  );
}

export default SignUp;
