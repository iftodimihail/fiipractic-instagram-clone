import { combineReducers, createStore } from "redux";

import { postsReducer } from "../reducers";

const reducers = combineReducers({
  posts: postsReducer,
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
