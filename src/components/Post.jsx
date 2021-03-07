import React, { useState } from "react";
import styled from "styled-components";
import Card from 'components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faCircle } from '@fortawesome/free-solid-svg-icons'
import PostGallery from './PostGallery';
import { faHeart as farHeart, faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { MessageCircle, Heart, Bookmark } from 'react-feather';

function Post({ post }) {
  const [imageIndex, setImageIndex] = useState(0);

  const PostHeader = styled.div`
    padding: 12px 19px;
    font-size: 15px;
  `;

  const ActionsBar = styled.div`
    display: flex;
    padding: 10px 12px;

    svg {
      margin-right: 7px;
    }
  `;

  const Pagination = styled.div`
    display: flex;
    position: relative;
    bottom: -5px;
    margin-left: auto;
    margin-right: auto;
  `;

  const SavePost = styled.div`
    display: flex;
    margin-left: 50px;
  `;

  return (
    <>
    <Card>
      <PostHeader>
        <img src={post.userImage} alt="profile pic" width="37" style={{ borderRadius: '50%', marginRight: 12 }}/>
        {post.userName}

        <FontAwesomeIcon icon={faEllipsisH} style={{ float: 'right', marginTop: 9}}/>
      </PostHeader>
      <hr style={{ margin: 0, padding: 0 }}/>
      <PostGallery images={post.images} imageIndex={imageIndex}/>      
      <hr style={{ margin: 0, padding: 0 }}/>
      <ActionsBar>
        <Heart fill="red" color="red" />
        <MessageCircle/>
        <Heart />
        <Pagination>
          <FontAwesomeIcon icon={faCircle}/>
          <FontAwesomeIcon icon={farCircle}/>
          <FontAwesomeIcon icon={farCircle}/>
        </Pagination>
        <SavePost>
          <Bookmark/>
        </SavePost>
      </ActionsBar>
    </Card>
    <br/>
    </>
  );
}

export default Post;
