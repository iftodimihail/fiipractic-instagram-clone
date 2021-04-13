import React, { useState } from "react";
import UploadModal from "./common/UploadModal";
import { Input } from "antd";
import firebase, { db } from "utils/firebase";

const UploadVideoModal = ({
  isOpenedVideoModal,
  setIsOpenedVideoModal,
  username,
  avatarUrl,
}) => {
  const [videoCaption, setVideoCaption] = useState("");

  async function onSuccess(video) {
    db.collection("postVideo").add({
      caption: videoCaption,
      video,
      avatarUrl,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setVideoCaption("");
  }

  return (
    <UploadModal
      title="Upload post"
      isOpened={isOpenedVideoModal}
      setIsOpen={setIsOpenedVideoModal}
      onSuccess={onSuccess}
      folderName="images"
    >
      <Input
        placeholder="Story title"
        value={videoCaption}
        onChange={(e) => setVideoCaption(e.target.value)}
      />
    </UploadModal>
  );
};

export default UploadVideoModal;
