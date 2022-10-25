import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/usersSlice";
import userReducer from "../feature/userSlice";
import postsReducer from "../feature/postsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
  },
});
