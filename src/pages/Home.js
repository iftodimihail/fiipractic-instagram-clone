import React, { useEffect, useState } from "react";
import Post from "components/Post";
import { db } from "utils/firebase";

function Home() {
  const [posts, setPosts] = useState([]);

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

  return posts.map((post) => <Post key={post.id} {...post} />);
}

export default Home;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import instagramLogo from "assets/instaLogo.png";
// import Post from "components/Post";
// import { auth, db } from "utils/firebase";
// import DropDownMenu from "components/DropDownMenu";
// import UploadModal from "components/UploadModal";
// import { useHistory } from "react-router";

// const AppContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;

// const Header = styled.div`
//   width: 100%;
//   position: sticky;
//   z-index: 10;
//   top: 0;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   padding: 12px;
//   border-bottom: 1px solid lightgray;
//   margin-bottom: 10px;
//   background-color: white;
//   img {
//     height: 40px;
//     object-fit: contain;
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// `;

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState();
//   const [isOpenedModal, setIsOpenedModal] = useState(false);
//   const history = useHistory();
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       setUser(authUser);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) =>
//         //setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))) echivalent cu:
//         setPosts(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             username: doc.data().username,
//             imageUrl: doc.data().imageUrl,
//             caption: doc.data().caption,
//           }))
//         )
//       );
//   }, []);

//   const navigateToProfile = () => {
//     history.push("/profile");
//   };
//   return posts.map((post) => ({
//     <Post key={post.id} {...post} user={auth} />
//   })
// }

// export default Home;
