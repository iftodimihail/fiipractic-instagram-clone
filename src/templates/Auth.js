import React from 'react'
import styled from 'styled-components'
import instagramLogo from "assets/instaLogo.png";

const CenteredWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AuthenticationContainer = styled.div`
    width: 400px;
    border: 1px solid lightgray;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;

    > * {
        margin-bottom: 30px;
    }
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

function Auth (props) {

    return (
        <CenteredWrap>
            <AuthenticationContainer>
            <LogoContainer>
                <img src={instagramLogo} alt="instagram logo" />
            </LogoContainer>

            {props.children}

            </AuthenticationContainer>
        </CenteredWrap>
    )
}

export default Auth;