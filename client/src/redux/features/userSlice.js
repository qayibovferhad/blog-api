import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: true,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      const user = action.payload;
      state.currentUser = user;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const { setCurrentUser, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
