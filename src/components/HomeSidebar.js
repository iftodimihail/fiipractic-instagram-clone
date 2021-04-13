import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { auth, db } from "utils/firebase";
import styled from "styled-components";
import { useHistory } from "react-router";

const HomeSidebarContainer = styled.div`
  min-width: 350px;
  position: sticky;
  height: fit-content;
  top: 94px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;
  color: inherit;
  margin-left: 16px;
  cursor: pointer;

  :hover {
    color: inherit;

    .username {
      text-decoration: underline;
    }
  }

  .username {
    font-weight: 600;
  }

  .fullname {
    opacity: 0.75;
  }
`;

const Suggestions = styled.div`
  margin-top: 20px;

  .suggestions-label {
    color: #8e8e8e;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const Suggestion = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 10px;
  }

  ${UserDetails} {
    margin-left: 16px;
  }
`;

function HomeSidebar() {
  const [userInfo, setUsersInfo] = useState();
  const [suggestions, setSuggestions] = useState();

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setUsersInfo(snapshot.data());
      });

    db.collection("users")
      .orderBy("userLastActive", "desc")
      .onSnapshot((snapshot) => {
        db.collection("follows")
          .get()
          .then((data) => {
            const following = data.docs
              .filter((doc) => doc.data().follower === auth.currentUser.uid)
              .map((doc) => doc.data().following);
            setSuggestions(
              snapshot.docs
                .filter(
                  (doc) =>
                    !following.includes(doc.id) &&
                    doc.id !== auth.currentUser.uid
                )
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .slice(0, 5)
            );
          });
      });
  }, []);

  return (
    <HomeSidebarContainer>
      {userInfo ? (
        <UserInfo>
          <a
            href={`/profile/${userInfo.userName}`}
            onClick={(e) => navigateToPage(e, "/profile/" + userInfo.userName)}
          >
            <Avatar
              size={56}
              src={userInfo.profilePicture}
              alt={userInfo.userName}
            >
              {userInfo.userName?.[0]?.toUpperCase()}
            </Avatar>
          </a>
          <UserDetails
            className="user-details"
            href={`/profile/${userInfo.userName}`}
            onClick={(e) => navigateToPage(e, "/profile/" + userInfo.userName)}
          >
            <div className="username">{userInfo.userName}</div>
            <div className="fullname">{userInfo.fullName}</div>
          </UserDetails>
        </UserInfo>
      ) : null}
      {suggestions && suggestions.length > 0 ? (
        <Suggestions>
          <div className="suggestions-label">Suggestions For You</div>
          {suggestions.map((suggestion) => (
            <Suggestion key={suggestion.userid}>
              <a
                href={`/profile/${suggestion.userName}`}
                onClick={(e) =>
                  navigateToPage(e, "/profile/" + suggestion.userName)
                }
              >
                <Avatar
                  size={36}
                  src={suggestion.profilePicture}
                  alt={suggestion.userName}
                >
                  {suggestion.userName?.[0]?.toUpperCase()}
                </Avatar>
              </a>
              <UserDetails
                className="user-details"
                href={`/profile/${suggestion.userName}`}
                onClick={(e) =>
                  navigateToPage(e, "/profile/" + suggestion.userName)
                }
              >
                <div className="username">{suggestion.userName}</div>
                <div className="fullname">{suggestion.fullName}</div>
              </UserDetails>
            </Suggestion>
          ))}
        </Suggestions>
      ) : null}
    </HomeSidebarContainer>
  );
}

export default HomeSidebar;
