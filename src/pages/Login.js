import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/Header";
import instaLogo from "assets/instaLogo.png";
import { auth } from "utils/firebase";
import { Button, Input } from "antd";
import { useHistory } from "react-router";

const LoginComponent = styled.div``;

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: "user",
        });
        history.push("/");
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <LoginComponent>
      <Header></Header>
      <CenteredWrap>
        <LoginContainer>
          <LogoContainer>
            <img src={instaLogo} alt="instagram logo" />
          </LogoContainer>

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
            autoComplete="my-password"
          />
          <Error>{errorMessage}</Error>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </LoginContainer>
      </CenteredWrap>
    </LoginComponent>
  );
}

export default Login;
