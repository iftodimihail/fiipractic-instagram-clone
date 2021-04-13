import React, { useState, useEffect } from "react";
import { Avatar, Button } from "antd";
import styled from "styled-components";
import firebase, { auth, db } from "utils/firebase";
import { useHistory } from "react-router";
import { MessageOutlined, FormOutlined } from "@ant-design/icons";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  height: 60px;
  align-items: center;
  padding: 0 20px;
`;

const FormIcon = styled(FormOutlined)`
  font-size: 25px;
  color: #fff;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: none;

  @media (max-width: 735px) {
    display: block;
    justify-self: flex-end;
  }
`;

const UserPhotoHeader = styled(Avatar)`
  margin-right: 10px;
  flex-shrink: 0;
`;

const UserDetails = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;
  color: inherit;
  flex-grow: 1;

  :hover {
    color: inherit;
    text-decoration: underline;
  }

  .username {
    font-weight: 600;
  }
  .fullname {
    opacity: 0.75;
  }
`;

const ChatContent = styled.div`
  padding: 20px 20px 0 20px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
`;

const SentMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;

  .text {
    background: #efefef;
    border: 1px solid #efefef;
    display: flex;
    align-items: center;
    max-width: 236px;
    min-height: 44px;
    overflow: hidden;
    padding: 8px 16px;
    border-radius: 22px;
  }

  .time {
    margin-right: 10px;
    opacity: 0.75;
    font-size: 11px;
  }
`;

const ReceivedMessage = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;

  .text {
    background: #ffffff;
    border: 1px solid #efefef;
    display: flex;
    align-items: center;
    max-width: 236px;
    min-height: 44px;
    overflow: hidden;
    padding: 8px 16px;
    border-radius: 22px;
  }

  .time {
    margin-left: 10px;
    opacity: 0.75;
    font-size: 11px;
  }
`;

const ChatFooter = styled.div`
  margin: 20px;
  border: 1px solid lightgray;
  border-radius: 22px;
  padding: 5px 10px;
  min-height: 44px;
`;

const ChatForm = styled.form`
  display: flex;
  align-items: center;
`;

const MessageInput = styled.textarea`
  background-color: transparent;
  border: 0;
  overflow: auto;
  padding: 8px 9px;
  resize: none;
  flex-grow: 1;

  :hover,
  :focus {
    border-color: lightgray;
    box-shadow: none;
    outline: 0;
  }
`;

const SendButton = styled(Button)`
  color: #0095f6;
  font-weight: 600;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;

const NoChatSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 70px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 32;
    font-weight: 300;
    margin-bottom: 0;
  }
  p {
    font-weight: 600;
  }
`;

function formatTimestamp(timestamp) {
  if (
    new Date().setHours(0, 0, 0, 0) === new Date(timestamp).setHours(0, 0, 0, 0)
  )
    return timestamp.toTimeString().substr(0, 5);
  return (
    ("0" + timestamp.getDate()).slice(-2) +
    "." +
    ("0" + parseInt(timestamp.getMonth() + 1)).slice(-2) +
    " " +
    timestamp.toTimeString().substr(0, 5)
  );
}

function Chat({ chatid, openNewChatModal }) {
  const [userInfo, setUserInfo] = useState();
  const [messages, setMessages] = useState([]);
  const [unsentMessage, setUnsentMessage] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const renderMessages = () => {
    return messages.map((message) => {
      let time = "";
      if (message.timestamp) {
        time = formatTimestamp(message.timestamp.toDate());
      }
      return message.sender === auth.currentUser.uid ? (
        <SentMessage key={message.id}>
          <div className="time">{time}</div>
          <div className="text">{message.message}</div>
        </SentMessage>
      ) : (
        <ReceivedMessage key={message.id}>
          <div className="text">{message.message}</div>
          <div className="time">{time}</div>
        </ReceivedMessage>
      );
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!unsentMessage.trim()) {
      return;
    }

    db.collection("chats").doc(chatid).collection("messages").add({
      sender: auth.currentUser.uid,
      message: unsentMessage,
      seen: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    db.collection("chats").doc(chatid).set(
      {
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    setUnsentMessage("");
  };

  const getUserInfo = (userId) => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => setUserInfo(doc.data()));
  };

  useEffect(() => {
    if (chatid) {
      db.collection("chats")
        .doc(chatid)
        .onSnapshot((snapshot) => {
          if (snapshot.data().firstUser !== auth.currentUser.uid)
            getUserInfo(snapshot.data().firstUser);
          else getUserInfo(snapshot.data().secondUser);
        });
      db.collection("chats")
        .doc(chatid)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(docs);
        });
    }
  }, [chatid]);

  useEffect(() => {
    const submitOnEnter = (e) => {
      if (e.which === 13 && !e.shiftKey) handleSendMessage(e);
    };
    document.addEventListener("keydown", submitOnEnter);

    return () => {
      document.removeEventListener("keydown", submitOnEnter);
    };
  });

  return chatid ? (
    <ChatContainer>
      {userInfo ? (
        <ChatHeader>
          <a
            href={`/profile/${userInfo.userName}`}
            onClick={(e) => navigateToPage(e, "/profile/" + userInfo.userName)}
          >
            <UserPhotoHeader
              size={40}
              src={userInfo.profilePicture}
              alt={userInfo.userName}
            >
              {userInfo.userName?.[0]?.toUpperCase()}
            </UserPhotoHeader>
          </a>
          <UserDetails
            href={`/profile/${userInfo.userName}`}
            onClick={(e) => navigateToPage(e, "/profile/" + userInfo.userName)}
          >
            <div className="username">{userInfo.userName}</div>
            <div className="fullname">{userInfo.fullName}</div>
          </UserDetails>
          <FormIcon onClick={openNewChatModal} />
        </ChatHeader>
      ) : null}
      <ChatContent>{renderMessages()}</ChatContent>
      <ChatFooter>
        <ChatForm>
          <MessageInput
            rows="1"
            placeholder="Message..."
            value={unsentMessage}
            onChange={(e) => setUnsentMessage(e.target.value)}
          />
          <SendButton
            type="text"
            htmlType="submit"
            onClick={handleSendMessage}
            disabled={!unsentMessage.trim()}
          >
            Send
          </SendButton>
        </ChatForm>
      </ChatFooter>
    </ChatContainer>
  ) : (
    <NoChatSelected>
      <MessageOutlined />
      <h1>Your Messages</h1>
      <p>Send messages to a friend or any other person.</p>
      <Button type="primary" onClick={openNewChatModal}>
        Send Message
      </Button>
    </NoChatSelected>
  );
}

export default Chat;
