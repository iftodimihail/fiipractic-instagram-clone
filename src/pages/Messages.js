import React, { useEffect, useState } from "react";
import firebase, { auth, db } from "utils/firebase";
import styled from "styled-components";
import User from "components/User";
import Conversation from "components/Conversation";

const MessageContainer = styled.div`
  width: 900px;
  max-height: 100%;
  display: flex;
  flex-direction: row;
`;

const UserList = styled.div`
  height: 90vh;
  overflow-y: auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
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

const ActionWrapper = styled.div`
  cursor: pointer;
`;

const InfoMsg = styled.div`
  text-align: center;
  font-size: 12px;
  margin: 30px 20px;
`;

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 90vh;
  overflow-y: auto;
  width: 600px;
  border: 1px solid lightgray;
`;

const InfoSelectUser = styled.div`
  text-align: center;
  font-size: 12px;
  margin: 30px 20px;
`;

const Messaages = () => {
  const [users, setUsers] = useState([]);
  const [myUser, setMyUser] = useState();
  const [activeConversation, setActiveConversation] = useState("none");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setMyUser(authUser?.displayName);
    });

    if (myUser) {
      const users = db.collection("users");
      users?.where("username", "==", myUser).onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const following = snapshot.docs[0].data().following;
          const followers = snapshot.docs[0].data().followers;
          const filterArray = following.filter((value) =>
            followers.includes(value)
          );
          if (filterArray.length > 0) {
            db.collection("users")
              .where("username", "in", filterArray)
              .onSnapshot((snapshot) => {
                setUsers(
                  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
              });
          }
        }
      });
    }
    return () => unsubscribe();
  }, [myUser]);

  return (
    <MessageContainer>
      <UserList>
        {users.length > 0 &&
          users.map((user) => (
            <ActionWrapper
              onClick={() => setActiveConversation(user)}
              key={user.id}
            >
              <User key={user.id} {...user}></User>{" "}
            </ActionWrapper>
          ))}
        <InfoMsg>
          To add a new person in your conversation list you need to follow and
          be followed by that person.
        </InfoMsg>
      </UserList>
      <ConversationContainer>
        {!activeConversation || activeConversation === "none" ? (
          <InfoSelectUser>
            You need to select a user in order to start a conversation.
          </InfoSelectUser>
        ) : (
          <Conversation
            myUsername={myUser}
            convUser={activeConversation}
          ></Conversation>
        )}
      </ConversationContainer>
    </MessageContainer>
  );
};

export default Messaages;
