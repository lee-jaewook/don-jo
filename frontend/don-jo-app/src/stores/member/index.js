import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  isLogIn: false,
  user: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setLogOut: {},
  },
});

export const { setLoading, setConnected } = memberSlice.actions;

export default memberSlice.reducer;
