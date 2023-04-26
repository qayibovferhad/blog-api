import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import blogReducer from "./features/blogSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
  },
});
export default store;
