import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import Stories from "react-insta-stories";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { db } from "utils/firebase";

const AllStoriesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.02);
  width: 600px;
  position: relative;
`;

const CarouselProv = styled(CarouselProvider)`
  width: 600px;
`;

const Carouseloo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PrevButton = styled(ButtonBack)`
  position: absolute;
  top: 35%;
  left: 1.3%;
  transform: translateY(-50%);
  border: 0;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 100%;
  opacity: 0.6;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const NextButton = styled(ButtonNext)`
  position: absolute;
  top: 35%;
  right: 1.3%;
  transform: translateY(-50%);
  border: 0;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 100%;
  opacity: 0.6;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const AllStoriesContain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 10px;
  flex-wrap: wrap;
  width: 500px;
`;

const Container = styled.div`
  position: relative;
  max-width: 800px;
`;

const StoriesAvatar = styled(Avatar)`
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.12);
  border: 2px solid #538efc;
`;

const Username = styled.div`
  font-size: 12px;
`;

const ViewStoriesCont = styled.div`
  width: 60%;
  height: 60%;
  padding: 83px;
  top: -94%;
  position: absolute;
  z-index: 999;
`;

const AllStories = () => {
  const [stories, setStories] = useState([]);
  const [pages, setPages] = useState(0);
  const [storyOpen, setStoryOpen] = useState(null);

  useEffect(() => {
    db.collection("stories")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const stories = Object.values(
          snapshot.docs
            .map((doc) => doc.data())
            .reduce((acc, current) => {
              if (acc[current.username]) {
                acc[current.username] = [...acc[current.username], current];
              } else {
                acc[current.username] = [current];
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
        <AllStoriesContainer>
          <CarouselProv
            naturalSlideWidth={130}
            naturalSlideHeight={25}
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
                            <AllStoriesContain
                              key={index}
                              onClick={() => {
                                setStoryOpen(
                                  storyList.map(({ imageUrl }) => imageUrl)
                                );
                                setTimeout(() => {
                                  setStoryOpen(null);
                                }, 1800 * storyList.length);
                              }}
                            >
                              <StoriesAvatar
                                size={55}
                                src={storyList[0].avatarUrl}
                              ></StoriesAvatar>
                              <Username>{storyList[0].username}</Username>
                            </AllStoriesContain>
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
        </AllStoriesContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AllStories;
