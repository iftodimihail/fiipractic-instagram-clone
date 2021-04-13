import React, { useEffect, useState } from "react";
import Post from "components/Post";
import { useParams } from "react-router";
import { db } from "utils/firebase";

function PostDetails() {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(() => {
    db.collection("posts")
      .doc(postid)
      .onSnapshot((snapshot) => setPost(snapshot.data()));
  }, [postid]);

  return post ? <Post id={postid} {...post}></Post> : null;
}

export default PostDetails;
