import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { db } from "utils/firebase";

function Home() {
    const [posts, setPosts] = useState([]);    
    
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
         return setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        });
    }, []);
    
    return posts.map( post => (
        <Post key={post.id} {...post} />   
    ));
}

export default Home;