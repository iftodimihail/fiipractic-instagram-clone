import React, { useState } from "react";
import {Input, message, Modal, Progress, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import firebase, { db, storage } from "utils/firebase";
import { nanoid } from "nanoid";


function UploadModal({isOpen, setIsOpen, username}) {
    const [file, setFile] = useState();
    const [ photoCaption, setPhotoCaption ] = useState("");
    const [ progress, serProgress ] = useState();
    const { Dragger } = Upload;

    const uploadProps = {
         onRemove: () => {
            setFile(null)
         },
         beforeUpload: (file) => {
            setFile(file);
            return false;
         },
         fileList: file ? [file] : []
     }

    const handleUpload = () => {
         const uploadTask = storage.ref(`images/${file.name}`).put(file);

         uploadTask.on(
            "stage_changed",

            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                serProgress(progress);
            },

            (error) => message.error(`${file.name} failes to upload`),
            () => {
                storage.ref("images").child(file.name).getDownloadURL()
                .then(async (imageUrl) => {
                    await db.collection("posts").add({
                        caption: photoCaption,
                        imageUrl,
                        username,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    setIsOpen(false);
                    setPhotoCaption("");
                    setFile();
                    serProgress(0);
                })
                .catch(error => console.log(error))
            }
        );
    }


    return (
        <Modal title="Upload Post" visible={isOpen} onCancel={() => setIsOpen(false)} onOk={handleUpload}>
            <Input value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value) }></Input>
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>    
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            <Progress percent={progress}></Progress>
        </Modal>
    );
}

export default UploadModal