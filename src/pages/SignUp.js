import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const Error = styled.span`
  color: red;
`;

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSignup = () => {
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
    <>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="email"
        autocomplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        autocomplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Error>{errorMessage}</Error>
      <Button type="primary" onClick={handleSignup}>
        Sign up
      </Button>
    </>
  );
}

export default SignUp;
