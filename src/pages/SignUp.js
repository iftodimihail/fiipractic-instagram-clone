import React, { useState } from "react";
import styled from "styled-components";
import instaLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";
import Header from "components/Header";

const SignupPage = styled.div`
`

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpcontainer = styled.div`
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

function SignUp() {
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
    <SignupPage>
      <Header></Header>
      <CenteredWrap>
        <SignUpcontainer>
          <LogoContainer>
            <img src={instaLogo} alt="instagram logo" />
          </LogoContainer>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="username"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
          />
          <Error>{errorMessage}</Error>
          <Button type="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </SignUpcontainer>
      </CenteredWrap>
    </SignupPage>
  );
}

export default SignUp;