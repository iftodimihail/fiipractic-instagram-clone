import React from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import Skeleton from 'react-loading-skeleton';
import Layout from '../components/layout/Layout';

// const AppContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;

function Home() {
  return (
    <>
    <Layout>
      <Skeleton count={5}/>
      <Post username="mihai" />
    </Layout>
    </>
  );
}

export default Home;
