import React, { useState } from "react";
import { message, Upload as AntUpload, Modal, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { storage } from "utils/firebase";

const UploadModal = ({
  title,
  onSuccess,
  isOpened,
  setIsOpen,
  folderName,
  children,
}) => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);

  const { Dragger } = AntUpload;

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

    const uploadTask = storage.ref(`${folderName}/${imageName}`).put(file);

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
          .ref(folderName)
          .child(imageName)
          .getDownloadURL()
          .then(async (imageUrl) => {
            await onSuccess(imageUrl);

            setIsOpen(false);
            setFile();
            setProgress(0);
          });
      }
    );
  };
  return (
    <div>
      <Modal
        title={title}
        visible={isOpened}
        onCancel={() => setIsOpen(false)}
        onOk={handleUpload}
      >
        {children}
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <Progress percent={progress} />
      </Modal>
    </div>
  );
};

export default UploadModal;
