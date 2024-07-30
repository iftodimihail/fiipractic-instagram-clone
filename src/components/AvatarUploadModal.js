import React from "react";
import { auth } from "utils/firebase";
import UploadModal from "./common/UploadModal";

function AvatarUploadModal({ isOpened, setIsOpen, setAvatar }) {
  async function onSuccess(imageUrl) {
    await auth.currentUser.updateProfile({
      photoURL: imageUrl,
    });

    setAvatar(imageUrl);
  }

  return (
    <UploadModal
      title="Upload avatar"
      isOpened={isOpened}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      folderName="avatars"
    />
  );
}

export default AvatarUploadModal;
