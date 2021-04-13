import React, { useEffect, useState, useMemo } from "react";
import firebase, { auth, db } from "utils/firebase";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Avatar, Input, Button } from "antd";

const ConversationComponent = styled.div`
    overflow-y: hidden;
`;

const TitleComponent = styled.div`
  height: 80px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ActionWrapper = styled.div`
  cursor: pointer;
  align-self: center;
  margin-left: 30px;
`;

const ConvAvatar = styled(Avatar)`
  align-self: center;
  min-width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-right: 10px;

  span {
    font-size: 60px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
`;

const NameDetails = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0px 10px;
`;

const Username = styled.div`
  font-size: 14px;
`;

const PostMessageComponent = styled.div`
  position: absolute;
  bottom: 0;
`;

const AddMessageContainer = styled.div`
  position: relative;
  display: flex;
  width: 590px;

`;

const MessageInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;

  :hover,
  :focus {
    border-color: lightgray;
    box-shadow: none;
  }
`;

const PostButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 10px;
  height: 100%;
  border-left: 1px solid lightgray;
  /* font-weight: bold; */
  font-size: 16px;
  :hover,
  :focus {
    background-color: transparent;
    border-left: 1px solid lightgray;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MessageRight = styled.div`
  background-color: #9fd8fb;
  border: 1px solid lightskyblue;
  font-size: 16px;
  text-align: left;
  margin-left: 150px;
  margin-right: 10px;
  padding: 2px 5px;
  width: fit-content;
  border-radius: 15px 7px 7px 15px;
  /* position: absolute; */
`;

const MessageLeft = styled.div`
  float: left;
  background-color: #f5f5f5;
  border: 1px solid #c8c8c8;
  margin-right: 150px;
  font-size: 16px;
  text-align: left;
  padding: 2px 5px;
  width: fit-content;
  border-radius: 7px 15px 15px 7px;
  /* position: absolute; */
`;

const MessagesComponent = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  margin: 10px 0px 10px 10px;
  gap: 10px;
  height: 89%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #bfbfbf;
  }
`;

const Conversation = ({ myUsername, convUser }) => {
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [message, setMessageText] = useState("");
  const convID =
    myUsername < convUser.username
      ? myUsername + "|" + convUser.username
      : convUser.username + "|" + myUsername;

  const messagesCollection = useMemo(
    () => db.collection("messages").doc(convID).collection("messages"),
    [convID]
  );

  useEffect(() => {
    messagesCollection.orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [messagesCollection]);

  const handlePostMessage = () => {
    if (!message.trim()) {
      return;
    }

    messagesCollection.add({
      owner: myUsername,
      messageText: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessageText("");
  };

  return (
    <ConversationComponent>
      {/* Conv Title */}
      <TitleComponent>
        <ActionWrapper
          onClick={() => history.push(`/${"profile/"}` + convUser.username)}
        >
          <ConvAvatar src={convUser?.profilepicture && convUser.profilepicture}>
            {convUser.username[0].toUpperCase()}
          </ConvAvatar>
        </ActionWrapper>
        <Info>
          <NameDetails>
            {convUser.firstname} {convUser.lastname}
          </NameDetails>
          <Username>({convUser.username})</Username>
        </Info>
      </TitleComponent>
      {/* Message history */}
      <MessagesComponent>
        {messages.map((msg) =>
          msg.owner == myUsername ? (
            <RightWrapper key={msg.id}>
              <MessageRight key={msg.id}>{msg.messageText}</MessageRight>
            </RightWrapper>
          ) : (
            <MessageLeft key={msg.id}>{msg.messageText}</MessageLeft>
          )
        )}
      </MessagesComponent>
      {/* New message */}
      <PostMessageComponent>
        <AddMessageContainer>
          <MessageInput
            value={message}
            onChange={(event) => setMessageText(event.target.value)}
            maxLength={200}
          ></MessageInput>
          <PostButton type="text" onClick={handlePostMessage}>
            Send
          </PostButton>
        </AddMessageContainer>
      </PostMessageComponent>
    </ConversationComponent>
  );
};

export default Conversation;
