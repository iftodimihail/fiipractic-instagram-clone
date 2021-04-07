import React, { useEffect, useState } from "react";
import firebase, { auth, db } from "utils/firebase";
import styled from "styled-components";
import User from "components/User";

const MessageContainer = styled.div`
  width: 900px;
  max-height: 100%;
`;

const UserList = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
`;

const ActionWrapper = styled.div`
  cursor: pointer;
`;

const InfoMsg = styled.div`
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
              onClick={() => setActiveConversation(user.username)}
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
    </MessageContainer>
  );
};

export default Messaages;
