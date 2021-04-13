// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBorderAll, faTv } from "@fortawesome/free-solid-svg-icons";
// import { Avatar } from "antd";
// import { CameraOutlined } from "@ant-design/icons";
// import styled from "styled-components";
// import { auth, db } from "utils/firebase";
// import AvatarUploadModal from "../components/AvatarUploadModal";
// import UserStoies from "../components/UserStoies";

// const ProfileContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 6rem;
//   box-sizing: border-box;
// `;

// const ProfileDetailsAndStorys = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 950px;
//   height: 200px;
//   box-sizing: border-box;
//   margin-bottom: 50px;
// `;

// const ProfileDetails = styled.div`
//   display: flex;
//   align-items: center;
//   width: 850px;
//   height: 200px;

//   margin-bottom: 50px;
// `;

// const CameraIcon = styled(CameraOutlined)`
//   font-size: 56px;
//   color: #fff;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.3);
//   cursor: pointer;
// `;

// const AvatarWrapper = styled.div`
//   position: relative;
//   margin-right: 75px;
//   margin-left: 25px;
//   ${CameraIcon} {
//     display: none;
//   }
//   :hover {
//     ${CameraIcon} {
//       position: absolute;
//       top: 0;
//       left: 0;
//       z-index: 10;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 50%;
//     }
//   }
// `;

// const MyAvatar = styled(Avatar)`
//   align-self: center;
//   box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
//   span {
//     font-size: 48px;
//   }
// `;

// const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   align-co
//   height: 60%;
//   flex-grow: 1;
// `;

// const Username = styled.span`
//   font-size: 28px;
//   font-weight: 300;
//   margin-bottom: 10px;
// `;

// const ProfileStats = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
// `;

// const ProfileStatsItem = styled.span`
//   font-size: 16px;
//   margin-right: 30px;
//   margin-bottom: 10px;
// `;

// const PhotoAndVideoBar = styled.div`
//    display: flex;
//    flex-direction: row;
//    align-items: center;
//    justify-content: center;
//    width: 900px;
//    border-top: 1px solid lightgrey;
//    padding: 20px 0;
//   }
// `;

// const PhotoComponentBar = styled.div`
//    width:max-content;
//    border-top: 2px solid grey;
//    padding: 15px;
//    margin: 0 10px;
//    margin-top: -21px;
//   }
// `;

// const FontIcon = styled(FontAwesomeIcon)`
//   color: #404040;
//   font-size: 15px;
//   margin-right: 6px;
// `;

// // const VideoComponentBar = styled.div`
// //    width:max-content;
// //    border-top: 2px solid grey;
// //    padding: 15px;
// //    margin: 0 10px;
// //    margin-top: -21px;
// //   }
// // `;

// const ProfilePosts = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 900px;
//   }
// `;

// const PostContainer = styled.div`
//   width: 280px;
//   height: 280px;
//   margin-bottom: 30px;
//   margin-right: 30px;

//   :nth-child(3n + 3) {
//     margin-right: 0;
//   }
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const UserProfile = () => {
//   const user = "test22";
//   const [posts, setPosts] = useState([]);

//   const renderProfilePosts = () => {
//     return posts.map(({ imageUrl }, index) => {
//       return (
//         <PostContainer key={index}>
//           <img src={imageUrl} alt="post" />
//         </PostContainer>
//       );
//     });
//   };

//   useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) => {
//         const filteredPost = snapshot.docs.filter((doc) => {
//           return doc.data().username === user;
//         });
//         return setPosts(
//           filteredPost.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//       });
//   }, []);
// };

// export default UserProfile;
