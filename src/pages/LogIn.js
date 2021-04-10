import React, { useState } from "react";
import styled from "styled-components";
import instaLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignUpContainer = styled.form`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const SignUpFooter = styled.div`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin-top: 10px;
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

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => history.push("/"))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <CenteredWrap>
      <SignUpContainer onSubmit={handleLogin}>
        <LogoContainer>
          <img src={instaLogo} alt="instagram logo" />
        </LogoContainer>
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
        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Log in
        </Button>
      </SignUpContainer>
      <SignUpFooter>
        <span>
          Don&apos;t have an account?&nbsp;
          <a href="/signup" onClick={(e) => navigateToPage(e, "/signup")}>
            <strong>Sign up</strong>
          </a>
        </span>
      </SignUpFooter>
    </CenteredWrap>
  );
}

export default LogIn;
