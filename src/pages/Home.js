import React, { useState } from "react";
import Post from "../components/Post";
import styled from "styled-components";
import instagramLogo from "../assets/instaLogo.png";
import { Button, Input } from "antd";


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
   width: 100%;
   display: flex;
   padding: 12px;
   margin-bottom: 10px;
justify-content: center;
align-items: center;
border-bottom: 1px solid lightgrey;

   img {
       height: 40px;
       object-fit: contain;
   }
`;

const AddPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const PostButton = styled(Button)`
   margin-left: 5px;
`;


function Home() {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);

    const handlePosts = () => {
        setPost("");
        setPosts((prevPosts) => {
            return [...prevPosts, post];
        });
    }

    return (
    <AppContainer>
        <Header>
            <img src={instagramLogo} alt=""></img>
        </Header>

        <AddPost>
            <Input value={post} onChange={ (event) => {setPost(event.target.value)}}/>
            <PostButton type="button" onClick={handlePosts}>Add Post</PostButton>
        </AddPost>
        { posts.map((post, index) => {
            return <Post key={index} username={post}/>
        })}
    </AppContainer>
    );
}

export default Home;