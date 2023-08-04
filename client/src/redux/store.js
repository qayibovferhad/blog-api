import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import blogReducer from "./features/blogSlice";
import dashboardSlice from "./features/dashboardSlice";
import chatReducer from "./features/chatSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    dashboard: dashboardSlice,
    chat: chatReducer,
  },
});
export default store;
