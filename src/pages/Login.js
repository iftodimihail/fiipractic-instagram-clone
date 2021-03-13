import React from "react";
import styled from "styled-components";
import Header from "components/Header";

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

function Login() {
  return (
    <LoginComponent>
      <Header></Header>
      <CenteredWrap>
        <LoginContainer></LoginContainer>
      </CenteredWrap>
    </LoginComponent>
  );
}

export default Login;
