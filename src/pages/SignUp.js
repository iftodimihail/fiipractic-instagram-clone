import React, { useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import instaLogo from "../assets/instaLogo.png";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const CentredWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 4px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 54px;
  margin-top: -100px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.15);
  > * {
    margin-bottom: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const Error = styled.span`
  color: red;
`;

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({ displayName: username });
        history.push("/");
      })
      .catch((err) => setError(err.massage));
  };
  return (
    <div>
      <CentredWrap>
        <SignUpContainer>
          <LogoContainer>
            <img src={instaLogo} alt="logoo" />
          </LogoContainer>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          ></Input>
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          ></Input>
          <Error>{error}</Error>
          <Button type="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </SignUpContainer>
      </CentredWrap>
    </div>
  );
};

export default SignUp;
