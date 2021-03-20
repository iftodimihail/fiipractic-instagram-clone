import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import Header from "components/Header";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  width: 700px;
  height: 200px;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  margin-right: 75px;
  margin-left: 25px;
  span {
    font-size: 48px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  flex-grow: 1;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const ProfileStats = styled.span`
  font-size: 16px;
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

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  justify-content: space-between;
`;

function Profile() {
  const [posts, setPosts] = useState([]);

  const renderProfilePosts = () => {
    return posts.map(({ imageUrl }, index) => {
      return (
        <PostContainer key={index}>
          <img src={imageUrl} alt="post"></img>
        </PostContainer>
      );
    });
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const filteredPosts = snapshot.docs.filter((doc) => {
          return doc.data().username === auth.currentUser?.displayName;
        });

        return setPosts(
          filteredPosts.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      });
  }, []);

  //   console.log(posts);

  return (
    <ProfileContainer>
      <Header></Header>
      <ProfileDetails>
        <MyAvatar size={128}>
          {auth.currentUser?.displayName?.[0]?.toUpperCase()}
        </MyAvatar>
        <ProfileInfo>
          <Username>{auth.currentUser?.displayName}</Username>
          <ProfileStats> 10 posts</ProfileStats>
        </ProfileInfo>
      </ProfileDetails>
      <ProfilePosts>{renderProfilePosts()}</ProfilePosts>
    </ProfileContainer>
  );
}

export default Profile;
