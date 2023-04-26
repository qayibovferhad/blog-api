import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", () => {
  return axios.get("blogs").then((response) => response.data);
});
const initialState = {
  list: [],
  loading: true,
  error: null,
};
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBlogs.pending]: () => {},
    [fetchBlogs.fulfilled]: (state, action) => {
      state.list = action.list;
      state.loading = false;
      state.error = null;
    },
    [fetchBlogs.rejected]: (state, action) => {
      state.list = [];
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default blogsSlice.reducer;
