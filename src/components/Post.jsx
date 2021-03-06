import React  from 'react';
import './Post.scss';

function Post({ username }) {
  return <div className="Post">
    { username }
  </div>;
}

export default Post;
