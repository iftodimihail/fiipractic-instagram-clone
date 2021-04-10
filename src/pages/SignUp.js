import React, { useState } from "react";
import styled from "styled-components";
import instaLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";
import firebase, { db, auth } from "utils/firebase";
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

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await db.collection("users").doc(authUser.user.uid).set({
          userName: username,
          fullName: "",
          description: "",
          profilePicture: "",
          userCreated: firebase.firestore.FieldValue.serverTimestamp(),
          userLastActive: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .then(async () => history.push("/"))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <CenteredWrap>
      <SignUpContainer>
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
        <Button type="primary" htmlType="submit" onClick={handleSignup}>
          Sign up
        </Button>
      </SignUpContainer>
      <SignUpFooter>
        <span>
          Have an account?&nbsp;
          <a href="/login" onClick={(e) => navigateToPage(e, "/login")}>
            <strong>Log in</strong>
          </a>
        </span>
      </SignUpFooter>
    </CenteredWrap>
  );
}

export default SignUp;
