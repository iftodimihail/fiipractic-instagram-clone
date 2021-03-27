import React, { useState } from "react";
import { Input, message, Modal, Progress, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import firebase, { db, storage } from "utils/firebase";
import { nanoid } from "nanoid";

function UploadModal(props) {
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

    const uploadTask = storage.ref(`${props.dbColumn}/${imageName}`).put(file);

    uploadTask.on(
      "stage_changed",
      // progress function
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      // error function
      (error) => message.error(`${imageName} failed to upload.`),
      // complete function
      () => {
        storage
          .ref(props.dbColumn)
          .child(imageName)
          .getDownloadURL()
          .then(async (imageUrl) => {
            props.imageWasUploaded(imageUrl);

            props.setIsOpen(false);
            setFile();
            setProgress(0);
          });
      }
    );
  };

  return (
    <Modal
      title="Upload post"
      visible={props.isOpened}
      onCancel={() => props.setIsOpen(false)}
      onOk={handleUpload}
    >
      {props.children}
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
