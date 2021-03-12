import React, {useState} from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";
import postImg from "assets/PostImg.png";
import Post from "components/Post";

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

const AddPostContainer = styled.div`
  position: relative;
  display: flex;
  width: 600px
`;

const PostInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border: 1px solid lightgray;
  padding: 10px 50px 10px 10px;
`;

const PostButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 5px;
  height: 100%;
`;

function Home() {
  const [PostData, setPostData] = useState("");
  const [Posts, setPosts] = useState([]);

  const handlePost = () => {
    
    if (PostData.length != 0)
    {
      console.log(Posts)

      setPosts((prevPosts) => {
        return [...prevPosts, PostData];
      });

      setPostData("")
    }
  }

  return (
    <AppContainer>
      {/* header */}
      <Header>
        <img src={instagramLogo} alt="instagram logo" />
      </Header>
      {/* list of posts */}

      <AddPostContainer>
        {/* input */}
        <PostInput
          value={PostData}
          onChange={(event) => setPostData(event.target.value)}
        />
        {/* post button */}
        <PostButton type="text" onClick={handlePost}>
          Post
        </PostButton>
      </AddPostContainer>

      {Posts.map((element, index) => (
        <Post key={index} username={element} imageUrl={postImg} />
      ))}
      
    </AppContainer>
  );
}

export default Home;
