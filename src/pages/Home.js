import React, { useEffect, useState } from "react";
import Post from "components/Post";
import { db } from "utils/firebase";
import styled from "styled-components";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const HomeComponent = styled.div``;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  // position: absolute;
  width: 400px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const SearchButton = styled(SearchOutlined)`
  font-size: 25px;
  margin-left: 5px;
`;
function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
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

  return (
    <HomeComponent>
      <SearchBar>
        <Input
          alt="searchbar"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
        <SearchButton
          onClick={() =>
            setPosts(
              posts.filter(function (post) {
                return (
                  post.caption.toLowerCase().includes(filter.toLowerCase()) ||
                  filter.toLowerCase().includes(post.caption.toLowerCase())
                );
              })
            )
          }
        ></SearchButton>
      </SearchBar>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </HomeComponent>
  );
}

export default Home;
