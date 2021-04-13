import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "utils/firebase";

const SuggestionsContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 20px;
`;

const SuggestionsItem = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  border-bottom: 1px solid grey;
  letter-spacing: 0.8px;
  color: #282828;
`;

const Title = styled.div`
  font-size: 20px;
`;

const UserInfo = styled.div`
  min-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: -1px 40px 0 10px;
`;

const UserInfoEmail = styled.div`
  font-size: 12px;
  color: grey;
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("usernames").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div>
      <SuggestionsContainer>
        <Title>All users</Title>
        {users?.map((user, index) => {
          return (
            <SuggestionsItem key={index}>
              <UserInfo>
                <b>{user.username}</b>
                <UserInfoEmail>{user.email}</UserInfoEmail>
              </UserInfo>
              {/* <div>Follow</div> */}
            </SuggestionsItem>
          );
        })}
      </SuggestionsContainer>
    </div>
  );
};

export default AllUsers;
