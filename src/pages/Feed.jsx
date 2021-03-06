import React  from 'react';

import Navbar from '../components/Navbar';
import Post   from '../components/Post';

import './Feed.css';

function Feed() {
  return <div className="Feed">
    <Navbar />

    <div className="UtilContainer">
      <Post username="pebly" />
      <Post username="pebly" />
      <Post username="pebly" />
      <Post username="pebly" />
    </div>
  </div>;
}

export default Feed;
