import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import igLogo from "assets/instaLogo.png";
import Post from "components/Post";
import PostInput from "components/PostInput";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const Home = (props) => {
  return (
    <AppContainer>
      <Header>
        <img src={igLogo} alt="Instagram Logo" />
      </Header>
      <PostInput />
      {props.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </AppContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps)(Home);

//TODO: Header, list of posts
