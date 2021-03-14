import React, {useState} from "react";
import { Modal, message, Input, Upload, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import firebase, { db, storage } from "utils/firebase";
import { nanoid } from "nanoid";


function UploadModal({ isOpened, setIsOpen, username }) {
  const [file, setFile] = useState();
  const [photoCaption, setPhotoCaption] = useState("");
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
    const imageName = `${nanoid()}_${file.name}`;   
    const uploadtask = storage.ref(`images/${imageName}`).put(file);
    
    uploadtask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => message.error(`${imageName} failed to upload.`),
      () => {
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then(async (imageUrl) => {
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
      onOk={handleUpload}
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
      <Progress percent={progress}/>
    </Modal>
  );
}

export default UploadModal;
