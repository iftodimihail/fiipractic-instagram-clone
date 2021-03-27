import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import { auth, db } from "utils/firebase";

const ProfileContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

const ProfileDetails = styled.div`
   display: flex;
   width: 900px;
   align-items: flex-start;
   padding-bottom: 25px;
   border-bottom: 1px solid lightgray;
`;

const MyAvatar = styled(Avatar)`
    margin-left: 30px;
    margin-right: 70px;
    span {
        font-size: 48px;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    
`;

const Username = styled.span`
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 5px;
`;

const ProfileStats = styled.span`
    font-size: 16px;
`;

const ProfilePosts = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 900px;
    
    justify-content: space-between;
    align-content: space-between;
`;

const PostContainer = styled.div`
    width: 280px;
    height: 280px;
    margin-bottom: 30px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

function Profile({ displayName }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot( snapshot => {
            const filtedPosts = snapshot.docs.filter((doc) => { 
                return doc.data().username === displayName;
            });

            return setPosts(filtedPosts.map(doc => ({ id: doc.id, ...doc.data() } )));
        });
    }, []);

  
    const renderProfilePosts = () => {
        return posts.map((post, index) => {
            return <PostContainer key={post.id}>
                <img src={post.imageUrl} alt="placeholder"></img>
            </PostContainer> 
        });
    }

    return (
        <ProfileContainer>
            <ProfileDetails>
                <MyAvatar size={128}>
                { displayName?.[0].toUpperCase() }
                </MyAvatar>                
                <ProfileInfo>
                    <Username>{ displayName }</Username>
                    <ProfileStats>10 posts</ProfileStats>
                </ProfileInfo>
            </ProfileDetails>
            <ProfilePosts>
                {renderProfilePosts()}
            </ProfilePosts>
        </ProfileContainer>
    );
}

export default Profile;