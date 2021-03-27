import React, { useState } from "react";
import { Input, message } from "antd";
import firebase, { db, storage, auth } from "utils/firebase";
import UploadModal from "components/UploadModal/UploadModal";

const AvatarUploadModal = ({ isOpened, setIsOpen, username, avatarUrl }) => {
  const imageWasUploaded = async (imageUrl) => {
    await auth.currentUser.updateProfile({
      photoURL: imageUrl,
    });
  };

  return (
    <UploadModal
      isOpened={isOpened}
      setIsOpen={setIsOpen}
      imageWasUploaded={imageWasUploaded}
      dbColumn="avatars"
    ></UploadModal>
  );
};

export default AvatarUploadModal;
