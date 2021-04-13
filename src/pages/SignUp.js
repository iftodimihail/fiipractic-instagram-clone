import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import styled from "styled-components";
import instaLogo from "../assets/instaLogo.png";
import g6 from "../assets/g6.gif";
import g7 from "../assets/g7.gif";
import g8 from "../assets/g8.gif";
import instaSvg from "../assets/insta.svg";
import firebase from "utils/firebase";
import { useHistory } from "react-router";

const CentredWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
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

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSignUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid)
            .set({
              username: username,
              email: email,
              friends: [],
            });
        });
      await firebase
        .firestore()
        .collection("usernames")
        .doc(username)
        .set({ username: username, email: email });
      firebase.auth().currentUser.updateProfile({
        displayName: username,
      });
      history.push("/home");
      return {};
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return {
            error: "E-mail already in use.",
          };
        case "auth/invalid-email":
          return {
            error: "Invalid e-mail address format.",
          };
        case "auth/weak-password":
          return {
            error: "Password is too weak.",
          };
        case "auth/too-many-requests":
          return {
            error: "Too many request. Try again in a minute.",
          };
        default:
          return {
            error: "Check your internet connection.",
          };
      }
    }
  };

  return (
    <div>
      <CentredWrap>
        <SignUpContainer>
          <LogoContainer>
            <img src={instaLogo} alt="logoo" />
          </LogoContainer>
          <InputTag
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputTag
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <InputTag
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <ButtonTag type="primary" onClick={handleSignUp}>
            Sign Up
          </ButtonTag>
          <RedirectMessage>
            <div style={{ marginRight: 3 }}>Have an account? </div>
            <Link to="/">
              <b style={{ color: "#CE4B56" }}> Log in</b>
            </Link>
          </RedirectMessage>
        </SignUpContainer>
        <RightContent>
          <CentralImg src={instaSvg} alt="sas"></CentralImg>
          <InstaImgI src={g7} alt="sas"></InstaImgI>

          <InstaImgLogo src={g8} alt="sas"></InstaImgLogo>
          <InstaImgTemp src={g6} alt="sas"></InstaImgTemp>
        </RightContent>
      </CentredWrap>
    </div>
  );
};

export default SignUp;
