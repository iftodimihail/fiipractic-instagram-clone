import React from "react";
import { useState } from "react";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import Post from "components/Post";
import Userbox from "components/Userbox"

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
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

let users = ["Tudor", "Mihai", "Luca"];



function Home() {
  
  const [Posts, setPosts] = useState([]);
  const [UserName, setUserName] = useState("");
  function AddPost(arg){
    if(arg.length>=1)
    setPosts([...Posts, arg]);
  }

  return (
    <AppContainer>
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
      </Header>

      
        <Userbox  addpostFunc = {AddPost}/>
      

      {/* list of posts */}
      {Posts.map((element, index) => (
        <div key={index}><Post username={element} /></div>
      ))}
    </AppContainer>
  );
}


export default Home;
