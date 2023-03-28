import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  isLogIn: false,
  pageName: "",
  nickName: "",
  color: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.isLogIn = true;
      state.pageName = action.payload.pageName;
      state.nickName = action.payload.nickName;
      state.color = action.payload.color;
    },
    setLogOut(state, action) {
      state.isLogIn = false;
      state.pageName = "";
      state.nickName = "";
      state.color = "";
    },
  },
});

export const { setLogIn, setLogOut, setLoading, setConnected } =
  memberSlice.actions;

export default memberSlice.reducer;
