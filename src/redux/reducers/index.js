import { CONSTANTS } from "../constants";

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_POST:
      return [...state, { username: action.payload, comments: [] }];
    case CONSTANTS.POST_COMMENT:
      const tempState = state;
      let post = tempState.find((u) => u.username === action.payload.username);
      if (post) {
        post.comments = [...post.comments, action.payload.comment];
      }
      return [...tempState];
    default:
      return state;
  }
};
