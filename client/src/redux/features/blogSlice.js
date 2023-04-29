import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", (params) => {
  return axios.get("blogs", { params }).then((response) => response.data);
});
const initialState = {
  list: [],
  currentPage: 1,
  total: 0,
  loading: true,
  error: null,
};
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchBlogs.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchBlogs.fulfilled]: (state, action) => {
      state.list = action.payload.list;
      state.total = action.payload.total;
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
export const { setCurrentPage } = blogsSlice.actions;
export default blogsSlice.reducer;
