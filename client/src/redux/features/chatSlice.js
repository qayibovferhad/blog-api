import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
export const fetchUsers = createAsyncThunk("chat/fetchUsers", () => {
  return axios.get("users").then((response) => response.data);
});
const initialState = {
  users: {
    list: [],
    total: 0,
    error: null,
    loading: true,
  },
  messages: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {},
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.list = action.payload.users;
      state.users.total = action.payload.total;
      state.users.error = null;
      state.users.loading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.users.loading = false;
      state.users.error = action.error;
    },
  },
});

export default chatSlice.reducer;
