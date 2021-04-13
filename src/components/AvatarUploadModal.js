import React, { useState } from "react";
import { message, Modal, Progress, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { auth, storage } from "utils/firebase";
import { nanoid } from "nanoid";

function AvatarUploadModal({ isOpened, setIsOpen }) {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);

  const { Dragger } = Upload;

  const uploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    fileList: file ? [file] : [],
  };

  const handleUpload = () => {
    const imageName = `${file.name}_${nanoid()}`;

    const uploadTask = storage.ref(`avatars/${imageName}`).put(file);

    uploadTask.on(
      "stage_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => message.error(`${imageName} failed to upload.`),
      () => {
        storage
          .ref("avatars")
          .child(imageName)
          .getDownloadURL()
          .then(async (imageUrl) => {
            await auth.currentUser.updateProfile({
              photoURL: imageUrl,
            });

            setIsOpen(false);
            setFile();
            setProgress(0);
          });
      }
    );
  };

  return (
    <Modal
      title="Upload avatar"
      visible={isOpened}
      onCancel={() => setIsOpen(false)}
      onOk={handleUpload}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <Progress percent={progress} />
    </Modal>
  );
}

export default AvatarUploadModal;
