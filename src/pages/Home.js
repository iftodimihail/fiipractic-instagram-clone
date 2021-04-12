import React, { useEffect, useState } from "react";
import Post from "components/Post";
import { auth, db } from "utils/firebase";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        db.collection("follows")
          .get()
          .then((data) => {
            const following = data.docs
              .filter((doc) => doc.data().follower === auth.currentUser.uid)
              .map((doc) => doc.data().following);
            setPosts(
              snapshot.docs
                .filter(
                  (doc) =>
                    following.includes(doc.data().userid) ||
                    doc.data().userid === auth.currentUser.uid
                )
                .map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          });
      });
  }, []);

  return posts.map((post) => <Post key={post.id} {...post} />);
}

export default Home;
