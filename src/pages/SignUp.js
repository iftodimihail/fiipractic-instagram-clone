import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import { Input, Button } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const CenteredWrap = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const SignUpContainer = styled.div`
   width: 300px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border: 1px solid lightgray;
   border-radius: 4px;
   padding: 25px;

   > * {
       margin-bottom: 10px;
   }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
      height: 40px;
      object-fit: contain;
  }
`;
const Error = styled.span`
  color: red;
`;


function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setMessage] = useState("");

    const history = useHistory();

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
            await authUser.user.updateProfile({
                displayName: username,
            });

            history.push("/");
        })
        .catch((err) => setMessage(err.message)); 
    };

    return (
    <CenteredWrap>
        <SignUpContainer>
            <LogoContainer>
                <img src={instagramLogo} alt="insta logo"></img>
            </LogoContainer>

            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Error>{errorMessage}</Error>
            <Button type="primary" onClick={handleSignUp}>Sign Up</Button>
        </SignUpContainer>

    </CenteredWrap>
    );
}

export default SignUp;