import React from 'react';

const PostGallery = ({images, imageIndex}) => {

  return (
    <>
      {images.map((image, index) => (
        <>
          <img key={index} src={images[index].original} width="100%" alt="img" />
        </>
      ))}
    </>
  )

}

export default PostGallery;