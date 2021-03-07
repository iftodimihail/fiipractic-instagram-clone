import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      "id": 20124312,
      "userName": "Alex",
      "userImage": "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp", 
      "imagesCount": 1,
      "images": [
        {
          original: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
          thumbnail: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        },
        // {
        //   original: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        //   thumbnail: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        // }
      ],
      "description": "my first instagram post", 
      "likes": 102,
      "comments": 2301,
      "firstComments": [
        {
          "userName": "Alex", 
          "verified": false,
          "content": "Thank you",
          "created_at": "timestamp",
          "likes": 201,
          "replies": 538,
        }
      ]
    },
    {
      "id": 20124312,
      "userName": "Alex",
      "userImage": "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp", 
      "imagesCount": 1,
      "images": [
        {
          original: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
          thumbnail: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        },
        // {
        //   original: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        //   thumbnail: "https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp",
        // }
      ],
      "description": "my first instagram post", 
      "likes": 102,
      "comments": 2301,
      "firstComments": [
        {
          "userName": "Alex", 
          "verified": false,
          "content": "Thank you",
          "created_at": "timestamp",
          "likes": 201,
          "replies": 538,
        }
      ]
    }
  ]);

  return (
    <>  
      {posts.map((post) => {
        return (
          <Post key={post.id} post={post} />
        )
      })}

      Loading animation for infinite scroll...
      <Skeleton height={100}/>

    </>
  )

}

export default Posts;