import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducers } from "./reducers";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({}).concat(logger); // can add custom middleware
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
