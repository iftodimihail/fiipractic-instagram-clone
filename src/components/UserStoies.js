import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Stories from "react-insta-stories";
import { db, auth } from "utils/firebase";

const UserStoriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 95%;
  box-sizing: border-box;
  padding: 20px 0;
`;

const CarouselProv = styled(CarouselProvider)`
  width: 950px;
  height: 200px;
`;

const PrevButton = styled(ButtonBack)`
  position: absolute;
  top: 35.5%;
  left: 21%;
  transform: translateY(-50%);
  border: 0;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.09);
  background: white;
  opacity: 0.6;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const NextButton = styled(ButtonNext)`
  position: absolute;
  top: 35.5%;
  right: 23%;
  transform: translateY(-50%);
  border: 0;
  opacity: 0.6;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.09);
  background: white;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  max-width: 800px;
  margin: auto;
`;

const Carouseloo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
`;

const UserStoriesContain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 40px 17px;
  box-sizing: border-box;
`;

const StoriesAvatar = styled(Avatar)`
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.05);
`;

const UserStoryTitle = styled.div`
  font-size: 13px;
`;

const ViewStoriesCont = styled.div`
  /* width: 100%;
  height: 100%; */
  /* padding: 93px; */
  top: 7%;
  /* left: 28%; */
  position: absolute;
  z-index: 999;
`;

const UserStoies = () => {
  const [pages, setPages] = useState(0);
  const [stories, setStories] = useState([]);
  const [storyOpen, setStoryOpen] = useState(null);

  useEffect(() => {
    db.collection("stories")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const filteredStory = snapshot.docs.filter((doc) => {
          return doc.data().username === auth.currentUser?.displayName;
        });
        const stories = Object.values(
          filteredStory
            .map((doc) => doc.data())
            .reduce((acc, current) => {
              if (acc[current.title]) {
                acc[current.title] = [...acc[current.title], current];
              } else {
                acc[current.title] = [current];
              }

              return acc;
            }, {})
        );
        setStories(stories);
        setPages(Math.ceil(stories.length / 7));
      });
  }, []);

  return (
    <div>
      {stories.length > 0 ? (
        <UserStoriesContainer>
          <CarouselProv
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={pages}
          >
            <PrevButton>
              <FontAwesomeIcon icon={faChevronLeft} />
            </PrevButton>
            {stories.length >= 8 ? (
              <NextButton>
                <FontAwesomeIcon icon={faChevronRight} />
              </NextButton>
            ) : (
              <></>
            )}

            <Container>
              <Slider>
                {Array.from(Array(pages)).map((_, page) => {
                  return (
                    <Slide index={page} key={page}>
                      <Carouseloo>
                        {stories
                          .slice(page * 7, (page + 1) * 7)
                          .map((storyList, index) => (
                            <UserStoriesContain
                              key={index}
                              onClick={() => {
                                setStoryOpen(
                                  storyList.map(({ imageUrl }) => imageUrl)
                                );
                                setTimeout(() => {
                                  setStoryOpen(null);
                                }, 2000 * storyList.length);
                              }}
                            >
                              <StoriesAvatar
                                size={80}
                                src={storyList[0].imageUrl}
                              ></StoriesAvatar>
                              <UserStoryTitle>
                                {storyList[0].title ? (
                                  storyList[0].title
                                ) : (
                                  <div>
                                    {new Date().toLocaleTimeString("en-En")}
                                  </div>
                                )}
                              </UserStoryTitle>
                            </UserStoriesContain>
                          ))}
                      </Carouseloo>
                    </Slide>
                  );
                })}
              </Slider>
            </Container>
          </CarouselProv>
          {Array.isArray(storyOpen) && (
            <ViewStoriesCont>
              <Stories
                stories={storyOpen}
                defaultInterval={1300}
                width={432}
                height={768}
              />
            </ViewStoriesCont>
          )}
        </UserStoriesContainer>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserStoies;
