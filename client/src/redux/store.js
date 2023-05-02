import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import blogReducer from "./features/blogSlice";
import dashboardSlice from "./features/dashboardSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    dashboard: dashboardSlice,
  },
});
export default store;
