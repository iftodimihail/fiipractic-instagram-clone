import React from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import particlesBg from "assets/particlesBg.jpg";
import Particles from "react-particles-js";

const CenteredWrap = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${particlesBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthenticationContainer = styled.div`
  max-width: 400px;
  width: 80%;

  background-color: rgba(255, 255, 255, 0.5);
  border: 3px solid white;
  border-radius: 8px;

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

const ParticlesBg = styled(Particles)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ParticlesSettings = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 300,
        line_linked: {
          opacity: 1,
        },
      },
    },
  },
};

function Auth(props) {
  return (
    <CenteredWrap>
      <ParticlesBg params={ParticlesSettings} />

      <AuthenticationContainer>
        <LogoContainer>
          <img src={instagramLogo} alt="instagram logo" />
        </LogoContainer>

        {props.children}
      </AuthenticationContainer>
    </CenteredWrap>
  );
}

export default Auth;
