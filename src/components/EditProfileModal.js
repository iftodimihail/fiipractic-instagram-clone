import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { message, Input, Upload, Avatar } from "antd";
import { nanoid } from "nanoid";
import firebase, { db, storage } from "utils/firebase";

const EditProfileModalComponent = styled.div`
  font-size: 12px;
  width: 500px;
  height: auto;
  background-color: #f2f2f2;
  color: black;
  z-index: 9;
  border: 1px solid #464545;
  opacity: 0.95;
`;

const ModalHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Action = styled.div`
  width: 100%;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: 0px;
  top: 0px;
  font-size: 24px;
  background: #ffffff;
  line-height: 1;
  opacity: 0.5;
  outline: 0;
  appearance: none;

  //border-radius: 18px;
  /* border: 1px solid #cfcece; */
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  /* align-items: center; */
  align-content: center;
  margin-right: 10px;
  margin-left: 10px;
  width: 100px;
  height: 100px;
  span {
    font-size: 60px;
    /* position: absolute;
    top: 30%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%); */
  }
`;

const MyDragger = styled(Upload)`
  margin-left: 20px;
  .ant-upload-drag-icon {
    padding-bottom: 0;
  }
`;

const ProfileInfoContainer = styled.div`
  width: 250px;
  height: 130px;
  margin-right: 30px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function EditProfileModal({ close, profileUser }) {
  const [file, setFile] = useState();
  const [photo, setPhoto] = useState();
  const [PhotoComponent, setPhotoUrl] = useState();
  const [firstn, setFirstName] = useState("");
  const [lastn, setLastName] = useState("");
  const [desc, setDescription] = useState("");

  const { TextArea } = Input;

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

  const handleUpload = async () => {
    if (file) {
      const imageName = `${nanoid()}_${file.name}`;
      const uploadtask = storage.ref(`profile-pictures/${imageName}`).put(file);

      await uploadtask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => message.error(`${imageName} failed to upload.`),
        () => {
          storage
            .ref("profile-pictures")
            .child(imageName)
            .getDownloadURL()
            .then(async (imageUrl) => {
              await db.collection("users").doc(profileUser).update({
                profilepicture: imageUrl,
              });
              setPhoto(imageUrl);
            });
        }
      );
    }

    const userColl = await db.collection("users");
    userColl.doc(profileUser).update({
      firstname: firstn,
      lastname: lastn,
      description: desc,
    });
  };

  useEffect(() => {
    const users = db.collection("users");
    if (profileUser) {
      users?.where("username", "==", profileUser).onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const myUserTemp = snapshot.docs[0].data();
          setDescription(myUserTemp.description);
          setFirstName(myUserTemp.firstname);
          setLastName(myUserTemp.lastname);
          if (myUserTemp.profilepicture !== "-") {
            setPhotoUrl(ProfileWithPicture(myUserTemp.profilepicture));
          } else setPhotoUrl(ProfileWithoutPicture());
        }
      });
    }
  }, [photo]);

  const ProfileWithPicture = (profileLink) => {
    return <MyAvatar size={128} src={profileLink}></MyAvatar>;
  };

  const ProfileWithoutPicture = () => {
    return <MyAvatar size={128}>{profileUser?.[0]?.toUpperCase()}</MyAvatar>;
  };

  return (
    <EditProfileModalComponent>
      <CloseButton onClick={close}>&times;</CloseButton>
      <ModalHeader>Edit profile</ModalHeader>
      <ContentContainer>
        <MyDragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            {/* <InboxOutlined /> */}
            {PhotoComponent}
          </p>
        </MyDragger>
        <ProfileInfoContainer>
          <Input
            placeholder="First Name"
            value={firstn}
            maxLength={30}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            placeholder="Last Name"
            maxLength={15}
            value={lastn}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextArea
            placeholder="Description"
            autoSize={{ minRows: 2, maxRows: 2 }}
            // showCount 
            maxLength={66}
            value={desc}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ProfileInfoContainer>
      </ContentContainer>
      <Action>
        <button
          className="button"
          onClick={() => {
            console.log("Profile updated");
            handleUpload();
          }}
        >
          Update profile
        </button>
      </Action>
    </EditProfileModalComponent>
  );
}

export default EditProfileModal;
