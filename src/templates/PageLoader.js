import React from "react";
import styled from "styled-components";
import RingLoader from "react-spinners/RingLoader";

const PageLoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLoader = () => {
  return (
    <PageLoaderContainer>
      <RingLoader size={80} color={"#F5A623"} loading={true} />
    </PageLoaderContainer>
  );
};

export default PageLoader;
