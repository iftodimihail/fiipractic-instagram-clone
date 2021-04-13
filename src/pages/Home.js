import React, { useState, useEffect } from "react";
// import { Input } from "antd";
import styled from "styled-components";
import Post from "../components/Post/";
import Suggestions from "../components/Suggestions";
import AllStories from "../components/AllStories";
import { db } from "utils/firebase";
import noPostImage from "assets/12345.png";
import "./Home.css";

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

// const SearchInput = styled(Input)`
//   width: 200px;
// `;

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const [filter, setFilter] = useState("");
  // const [searchTerm, setsearchTerm] = useState("");
  const [postVideo, setPostVideo] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    db.collection("postVideo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPostVideo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, []);

  // const postSearch = posts.filter((post) => {
  //   if (searchTerm === "") {
  //     return post;
  //   } else if (
  //     post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     searchTerm.toLowerCase().includes(post.caption.toLowerCase())
  //   ) {
  //     return post;
  //   }
  // });

  // const handleSearchTerm = (e) => {
  //   setsearchTerm(e.target.value);
  // };

  return (
    <HomeContainer>
      <div>
        <AllStories />
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} {...post} postId={post.id} />)
        ) : (
          <div>
            <Post
              key="1"
              postId="ourPost"
              imageUrl={noPostImage}
              username="Post"
            />
          </div>
        )}
      </div>
      <div>
        {/* <div>
          <SearchInput
            placeholder="Search"
            onChange={(e) => handleSearchTerm(e)}
          />
          <button onClick={() => setPosts(postSearch)}>Find</button>
        </div> */}
        <Suggestions />
      </div>
    </HomeContainer>
  );
};

export default Home;
