import React, { useState } from "react";
import { Input } from "antd";
import firebase, { db } from "utils/firebase";
import UploadModal from "./common/UploadModal";

function PostUploadModal({ isOpened, setIsOpen, username, avatarUrl }) {
  const [photoCaption, setPhotoCaption] = useState("");

  async function onSuccess(imageUrl) {
    db.collection("posts").add({
      caption: photoCaption,
      imageUrl,
      avatarUrl,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setPhotoCaption("");
  }

  return (
    <UploadModal
      title="Upload post"
      isOpened={isOpened}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      folderName="images"
    >
      <Input
        placeholder="Photo caption"
        value={photoCaption}
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
    </UploadModal>
  );
}

export default PostUploadModal;
