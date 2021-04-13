import React, { useState } from "react";
import UploadModal from "./common/UploadModal";
import { Input } from "antd";
import firebase, { db } from "utils/firebase";

const UploadStoryModal = ({
  isOpenStoryModal,
  setIsOpenStoryModal,
  username,
  avatarUrl,
}) => {
  const [storyTitle, setStoryTitle] = useState("");

  async function onSuccess(imageUrl) {
    db.collection("stories").add({
      title: storyTitle,
      imageUrl,
      avatarUrl,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setStoryTitle("");
  }

  return (
    <UploadModal
      title="Upload post"
      isOpened={isOpenStoryModal}
      setIsOpen={setIsOpenStoryModal}
      onSuccess={onSuccess}
      folderName="stories"
    >
      <Input
        placeholder="Story title"
        value={storyTitle}
        onChange={(e) => setStoryTitle(e.target.value)}
      />
    </UploadModal>
  );
};

export default UploadStoryModal;
