import React, { useState } from "react";
import { Input, message } from "antd";
import firebase, { db, storage } from "utils/firebase";
import UploadModal from "components/UploadModal/UploadModal";

const PostUploadModal = ({ isOpened, setIsOpen, username, avatarUrl }) => {
  const [photoCaption, setPhotoCaption] = useState("");

  const imageWasUploaded = async (imageUrl) => {
    await db.collection("posts").add({
      caption: photoCaption,
      imageUrl,
      avatarUrl,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setPhotoCaption("");
  };

  return (
    <UploadModal
      isOpened={isOpened}
      setIsOpen={setIsOpen}
      imageWasUploaded={imageWasUploaded}
      dbColumn="images"
    >
      <Input
        placeholder="Photo caption"
        value={photoCaption}
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
    </UploadModal>
  );
};

export default PostUploadModal;
