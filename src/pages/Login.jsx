import React from 'react';
import LoginForm from '../components/guest/LoginForm';
import styled from 'styled-components';
import instagramPhone from '../assets/instagram-phone.jpg';

const Login = () => {
  const LoginWrapper = styled.div`
    padding: 50px;
  `;

  return (
    <LoginWrapper>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <img src={instagramPhone} alt="instagram phone" width="80%" style={{marginLeft: '20%'}}/>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <LoginForm/>
        </div>
      </div>
    </LoginWrapper>
  );
}

export default Login;