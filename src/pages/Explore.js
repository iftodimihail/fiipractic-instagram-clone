import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "utils/firebase";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";

const ExploreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

const PostDetails = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
`;

const PostContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :hover {
    ${PostDetails} {
      display: flex;
    }
  }
`;

const HeartIcon = styled(HeartOutlined)`
  margin-right: 5px;
`;

const CommentIcon = styled(CommentOutlined)`
  margin-left: 30px;
  margin-right: 5px;
`;

function Explore() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        Promise.all(
          snapshot.docs.map(async (doc) => {
            let likes = 0,
              comments = 0;
            await db
              .collection("posts")
              .doc(doc.id)
              .collection("likes")
              .get()
              .then((doc) => (likes = doc.size));
            await db
              .collection("posts")
              .doc(doc.id)
              .collection("comments")
              .get()
              .then((doc) => (comments = doc.size));
            return {
              id: doc.id,
              ...doc.data(),
              likes: likes,
              comments: comments,
            };
          })
        ).then(setPosts);
      });
  }, []);

  return (
    <ExploreContainer>
      {posts.map((post, index) => {
        return (
          <PostContainer key={index}>
            <img src={post.imageUrl} alt="post" />
            <PostDetails>
              <HeartIcon />
              {post.likes} <CommentIcon />
              {post.comments}
            </PostDetails>
          </PostContainer>
        );
      })}
    </ExploreContainer>
  );
}

export default Explore;
