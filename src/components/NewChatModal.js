import React, { useState, useEffect } from "react";
import { Avatar, Modal } from "antd";
import firebase, { auth, db } from "utils/firebase";
import styled from "styled-components";

const UsersModal = styled(Modal)`
  .ant-modal-body {
    padding: 10px 0;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 24px;

  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const UserPhoto = styled(Avatar)`
  margin-right: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;

  .username {
    font-weight: 600;
  }
  .fullname {
    opacity: 0.75;
  }
`;

function NewChatModal({ isOpened, setIsOpened, setOpenedChat }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users")
      .where("__name__", "!=", auth.currentUser.uid)
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        )
      );
  }, []);

  const handleCreateChat = (firstUser, secondUser) => {
    const chatExists = async () => {
      const firstCheck = db
        .collection("chats")
        .where("firstUser", "==", firstUser)
        .where("secondUser", "==", secondUser)
        .get()
        .then((doc) => {
          if (doc.empty) return false;
          return doc.docs[0].id;
        });
      const secondCheck = db
        .collection("chats")
        .where("firstUser", "==", secondUser)
        .where("secondUser", "==", firstUser)
        .get()
        .then((doc) => {
          if (doc.empty) return false;
          return doc.docs[0].id;
        });
      const [first, second] = await Promise.all([firstCheck, secondCheck]);

      if (first && !second) return first;
      if (!first && second) return second;
      if (first && second && first === second) return first;
      return false;
    };

    chatExists().then((chatid) => {
      if (!chatid) {
        db.collection("chats")
          .add({
            firstUser: firstUser,
            secondUser: secondUser,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((doc) => setOpenedChat(doc.id));
      } else {
        setOpenedChat(chatid);
      }
    });
    setIsOpened(false);
  };

  return (
    <UsersModal
      title="New chat"
      visible={isOpened}
      onCancel={() => setIsOpened(false)}
    >
      {users.map((user) => (
        <User
          key={user.id}
          {...user}
          onClick={() => handleCreateChat(auth.currentUser.uid, user.id)}
        >
          <UserPhoto size={40} src={user.profilePicture} alt={user.userName}>
            {user.userName?.[0]?.toUpperCase()}
          </UserPhoto>
          <UserDetails>
            <div className="username">{user.userName}</div>
            <div className="fullname">{user.fullName}</div>
          </UserDetails>
        </User>
      ))}
    </UsersModal>
  );
}

export default NewChatModal;
