import React from 'react';
import styled from 'styled-components';
import instagramLogo from '../../assets/instaLogo.png';
import googlePlay from '../../assets/googleplay.png';
import appStore from '../../assets/appstore.png';

const LoginForm = () => { 

  const FormWrapper = styled.div`
    width: 100%;
    padding: 25px 50px;
    background-color: #FFFFFF;
    border: 1px solid #DBDBDB;
    border-radius: 2px;
    margin-top: 10px;
  `;

  const Input = styled.input`
    margin-bottom: 10px;
    outline: 0px !important; 
    box-shadow: none !important;

    ::placeholder {
      color: #DBDBDB;
    }
  `;

  const BtnLogin = styled.button`
    background-color: #B2DFFC !important;
    border-color: #B2DFFC !important;
    margin-top: 15px;
    margin-bottom: 10px;
  `;

  const ForgotPassword = styled.a`
    color: black;
  `;

  const DownloadTheApp = styled.div`
    display: flex;
  `;

  const StoreIcon = styled.img`
    display: flex;
    width: 35%;
    margin-right: 10px;
  `;

  return (
    <>
    <FormWrapper>
      <img src={instagramLogo} alt="logo" width="70%" style={{ marginLeft: '15%', marginRight: '15%', paddingBottom: 30, marginTop: 10}}/>

      <form action="">
        <Input type="text" required name="email" placeholder="Phone number, username or email" className="form-control"/>
        <Input type="password" required name="password" placeholder="Password" className="form-control"/>
        <BtnLogin className="btn btn-info btn-block">Login</BtnLogin>

        <div className="text-center">
          <ForgotPassword href="#A">
            Forgot password?
          </ForgotPassword>
        </div>
      
      </form>
    </FormWrapper>

    <FormWrapper>
      <div className="text-center">
        Don&apos;t have an account? <a href="#A">Sign up</a>
      </div>
    </FormWrapper>

    <div className="text-center mt-3 mb-2">
      Download the app
    </div>
    <DownloadTheApp className="text-center">
      <StoreIcon src={googlePlay} className="ml-auto" alt="google-play"/>
      <StoreIcon src={appStore} className="mr-auto" alt="google-play"/>
    </DownloadTheApp>
    
    </>
  )

}

export default LoginForm;