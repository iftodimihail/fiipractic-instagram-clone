import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {db, auth} from 'utils/firebase'

const PostContainer = styled.div`
    width: 200px;
    height: 300px;
    object-fit: cover;
`;

const ProfilePostContainer = styled.div`
    width: 100%;
    display : flex;
    flex-wrap: wrap;
    justify-content: space-betweeen;
    flex-direction: row;
`;

function Profile ()
{
    const [posts, setPosts] = useState([]);

    const renderProfilePosts = () => {
    // const postsArr = [1, 2, 3, 4];
        return posts.map(({ imageUrl }, index) => {
            return <PostContainer key={index}>
            <img src={imageUrl} alt="post" />
            </PostContainer>
        })
    }

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
            const filteredPosts = snapshot.docs.filter(doc => {
                return doc.data().username === auth.currentUser?.displayName;
            })
            return setPosts(filteredPosts.map(post => ({
                id: post.id,
                ...post.data()
            })))
        })
    }, []);


    return (
        <ProfilePostContainer>
            {renderProfilePosts()}
        </ProfilePostContainer>
    )
}

export default Profile