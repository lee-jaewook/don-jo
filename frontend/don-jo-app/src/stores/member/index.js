import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  isLogIn: false,
  pageName: "",
  user: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.isLogIn = true;
      state.pageName = action.payload.pageName;
    },
    setLogOut(state, action) {
      state.isLogIn = false;
      state.pageName = "";
    },
  },
});

export const { setLogIn, setLogOut, setLoading, setConnected } =
  memberSlice.actions;

export default memberSlice.reducer;
