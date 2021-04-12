import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { auth, db } from "utils/firebase";

const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 24px;

  :hover {
    background: rgba(0, 0, 0, 0.025);
  }

  &.active {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const UserPhoto = styled(Avatar)`
  margin-right: 10px;
  flex-shrink: 0;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;

  .username {
    font-weight: 600;
  }
  .last-active {
    opacity: 0.75;
  }
`;

function timeSince(timeStamp) {
  let now = new Date();
  let secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return "now";
  }
  if (secondsPast < 3600) {
    if (parseInt(secondsPast / 60) === 1)
      return parseInt(secondsPast / 60) + " minute ago";
    return parseInt(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast < 86400) {
    if (parseInt(secondsPast / 3600) === 1)
      return parseInt(secondsPast / 3600) + " hour ago";
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast < 604800) {
    if (parseInt(secondsPast / 86400) === 1)
      return parseInt(secondsPast / 86400) + " day ago";
    return parseInt(secondsPast / 86400) + " days ago";
  }
  if (secondsPast < 2628000) {
    if (parseInt(secondsPast / 604800) === 1)
      return parseInt(secondsPast / 604800) + " month ago";
    return parseInt(secondsPast / 604800) + " months ago";
  }
  if (parseInt(secondsPast / 2628000) === 1)
    return parseInt(secondsPast / 2628000) + " year ago";
  return parseInt(secondsPast / 2628000) + " years ago";
}

function ChatList({ openedChat, setOpenedChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) =>
        Promise.all(
          snapshot.docs
            .filter(
              (doc) =>
                doc.data().firstUser === auth.currentUser.uid ||
                doc.data().secondUser === auth.currentUser.uid
            )
            .map(async (doc) => {
              let userid, username, avatarUrl, fullname, lastActive;

              if (doc.data().firstUser === auth.currentUser.uid)
                userid = doc.data().secondUser;
              else userid = doc.data().firstUser;

              await db
                .collection("users")
                .doc(userid)
                .get()
                .then((userDoc) => {
                  username = userDoc.data().userName;
                  avatarUrl = userDoc.data().profilePicture;
                  fullname = userDoc.data().fullName;
                  lastActive = timeSince(
                    userDoc.data().userLastActive.toDate()
                  );
                });
              return {
                id: doc.id,
                username: username,
                avatarUrl: avatarUrl,
                fullname: fullname,
                lastActive: lastActive,
              };
            })
        ).then(setChats)
      );
  }, []);

  return chats.map((chat) => {
    let active;
    if (chat.id === openedChat) active = "active";
    else active = "";

    return (
      <ChatListItem
        key={chat.id}
        className={active}
        {...chat}
        onClick={() => setOpenedChat(chat.id)}
      >
        <UserPhoto size={40} src={chat.avatarUrl} alt={chat.username}>
          {chat.username?.[0]?.toUpperCase()}
        </UserPhoto>
        <UserDetails>
          <div className="username">{chat.username}</div>
          <div className="last-active">Active {chat.lastActive}</div>
        </UserDetails>
      </ChatListItem>
    );
  });
}

export default ChatList;
