import React, { useState } from "react";
import { Avatar, Input, Button } from "antd";
import styled from "styled-components";
import instagramLogo from "assets/instaLogo.png";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 20px;
`;

const PostHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-start;
   padding: 20px;
   border-bottom: 1px solid lightgray;
`;

const UsernmaeText = styled.span`
   font-weight: 600;
   margin-left: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items:center;

  >img {
    width: 100%;
    object-fit: contain;
  }
`;


const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top:1px solid lightgray;
  padding: 10px 50px 10px 10px;

  :hover, :focus {
      border-color: transparent;
      box-shadow: none;
  }
`;

const PostButton = styled(Button)`
   position: absolute;
   right: 0;
   padding: 0 10px 0 5px;
   height: 100%;

   :hover, :focus {
       background-color: transparent;
       color: #5094ce;
   }
`;

const Caption = styled.div`
  padding: 10px;

  strong {
    margin-right: 5px;
  }
`;


function Post({username = "edik" , avatarUrl, imageUrl, caption}) {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const handlePostComments = () => {
        setComments((prevComments) => {
            setCommentText("");
            return [...prevComments, commentText];
        });
    }

    return (
    <PostContainer>
        <PostHeader>
            <Avatar src={avatarUrl} alt={username}> {username[0].toUpperCase()}</Avatar>

            <UsernmaeText>{username}</UsernmaeText>
        </PostHeader>

        <ImageContainer>
            <img src={imageUrl} alt="hey you"></img>
        </ImageContainer>

        <Caption><strong>{username}</strong>{caption}</Caption>
        

        <AddCommentContainer> 
            <CommentInput value={commentText} onChange={(event) => setCommentText(event.target.value)}/>
            <PostButton type="text" onClick={handlePostComments}>Post</PostButton>
        </AddCommentContainer>
         
        {/* action menu */}
        {/* nr of likes */}
        {/* comment section */}
    </PostContainer>
    );
}

export default Post;