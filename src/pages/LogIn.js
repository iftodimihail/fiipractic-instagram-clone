import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const Error = styled.span`
  color: red;
`;

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(history.push("/"))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <>
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
      <Button type="primary" onClick={handleLogin}>
        Log in
      </Button>
    </>
  );
}

export default LogIn;
