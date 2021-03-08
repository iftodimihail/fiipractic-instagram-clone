import { CONSTANTS } from "../constants";

export const createPost = (username) => {
  return {
    type: CONSTANTS.CREATE_POST,
    payload: username,
  };
};

export const postComment = (username, comment) => {
  return {
    type: CONSTANTS.POST_COMMENT,
    payload: { username, comment },
  };
};
