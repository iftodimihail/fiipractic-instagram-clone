import React, { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import { Button, Input } from "antd";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";

const CentredWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginContainer = styled.div`
    width: 300px;
    padding: 25px;
    border-radius: 4px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >*{
        margin-bottom: 10px;
    }
`;

const LogoContainer = styled.div`
   img {
       height: 40px;
       object-fit: contain;
   }
`;

const ErrorMessage = styled.span`
    color: red;
`;

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((authUser) => {
            history.push("/");
        })
        .catch((err) => setError(err.message));
    };
    
    return (
        <CentredWrap>
            <LoginContainer>
                <LogoContainer>
                    <img src={instagramLogo} alt="logo"></img>
                </LogoContainer>
                <Input placeholder="email" type="email" value={email} onChange={ (e) => setEmail(e.target.value)}/>
                <Input placeholder="Password" type="password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
                <ErrorMessage>{error}</ErrorMessage>
                <Button type="primary" onClick={handleLogin}>Login</Button>
            </LoginContainer>
        </CentredWrap>
    );
}

export default LoginPage;