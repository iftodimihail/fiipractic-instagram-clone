import React, { useState } from "react";
import styled from "styled-components";

import instaLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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

  const handleSignUp = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <CenteredWrap>
      <LoginContainer>
        <LogoContainer>
          <img src={instaLogo} alt="instagram logo" />
        </LogoContainer>
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
        <Link to="/signup">Sign up</Link>
        <Button type="primary" onClick={handleSignUp}>
          Login
        </Button>
      </LoginContainer>
    </CenteredWrap>
  );
}

export default Login;
