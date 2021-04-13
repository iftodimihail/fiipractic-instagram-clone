import React, { useState } from "react";
import { Input, Button } from "antd";
import instaLogo from "../assets/instaLogo.png";
import { Link } from "react-router-dom";
import g6 from "../assets/g6.gif";
import g7 from "../assets/g7.gif";
import g8 from "../assets/g8.gif";
import instaSvg from "../assets/insta.svg";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";
import styled from "styled-components";

const CentredWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogInContainer = styled.div`
  width: 30%;
  height: 60%;
  border: 1px solid lightgray;
  border-radius: 4px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 54px;
  margin-top: -100px;
  margin-left: 5%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 55px;
    object-fit: contain;
    margin-bottom: 30px;
  }
`;

const InputTag = styled(Input)`
  margin: 7px 0;
  width: 90%;
  padding: 5px;

  :hover,
  :focus {
    border-color: #ce4b56;
    box-shadow: none;
  }
`;

const ButtonTag = styled(Button)`
  margin-top: 22px;
  margin-bottom: 8px;
  width: 90%;
  background: #ce4b56;
  border-color: #ce4b56;

  :hover,
  :focus {
    border-color: #ce4b56;
    box-shadow: none;
    background: #ce4b56;
  }
`;

const RedirectMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 11px;
  color: grey;
`;

const RightContent = styled.div`
  width: 70%;
`;

const CentralImg = styled.img`
  width: 68%;
  position: relatiive;
  left: 50%;
  transform: translateX(-5%);
  transform: translateY(-5%);
`;

const InstaImgI = styled.img`
  width: 8%;
  position: absolute;
  top: 18%;
  left: 43%;
`;

const InstaImgLogo = styled.img`
  width: 10%;
  position: absolute;
  top: 13%;
  right: 14%;
`;

const InstaImgTemp = styled.img`
  width: 8%;
  position: absolute;
  top: 38%;
  right: 10%;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        history.push("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <CentredWrap>
      <LogInContainer>
        <LogoContainer>
          <img src={instaLogo} alt="logoo" />
        </LogoContainer>
        <InputTag
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        ></InputTag>
        <InputTag
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        ></InputTag>
        <Error>{error}</Error>
        <ButtonTag type="primary" onClick={handleLogIn}>
          Sign Up
        </ButtonTag>
        <RedirectMessage>
          <div style={{ marginRight: 3 }}>Don&apos;t have an account? </div>
          <Link to="/signup">
            <b style={{ color: "#CE4B56" }}> Sign up</b>
          </Link>
        </RedirectMessage>
      </LogInContainer>
      <RightContent>
        <CentralImg src={instaSvg} alt="sas"></CentralImg>
        <InstaImgI src={g7} alt="sas"></InstaImgI>

        <InstaImgLogo src={g8} alt="sas"></InstaImgLogo>
        <InstaImgTemp src={g6} alt="sas"></InstaImgTemp>
      </RightContent>
    </CentredWrap>
  );
};

export default Login;
