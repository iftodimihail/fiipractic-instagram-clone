import React, { useState } from "react";
import { Input, Modal, Progress, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import firebase, { db, storage } from "utils/firebase";
import { nanoid } from "nanoid";

function UploadModal({ isOpened, setIsOpen, username }) {
  const { Dragger } = Upload;
  const [file, setFile] = useState();
  const [photoCaption, setPhotoCaption] = useState("");
  const [progress, setProgress] = useState(0);
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
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "stage_changed",
      //progress function
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      //error function
      (error) => message.error(`${file.name} failed to upload.`),
      //complete function
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then.apply(async (imageUrl) => {
            await db.collection("posts").add({
              caption: photoCaption,
              imageUrl,
              username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setIsOpen(false);
            setPhotoCaption("");
            setFile();
            setProgress(0);
          });
      }
    );
  };

  return (
    <Modal
      title="Upload Post"
      visible={isOpened}
      onCancel={() => setIsOpen(false)}
      onOk={handleUpload()}
    >
      <Input
        placeholder="Photo caption"
        value={photoCaption}
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Progress percent={progress} />
    </Modal>
  );
}
export default UploadModal;
