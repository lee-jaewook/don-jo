import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  isLogIn: false,
  pageName: "",
  nickName: "",
  themeColor: 0,
  profileImagePath: "",
  walletAddress: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.isLogIn = true;
      state.pageName = action.payload.pageName;
      state.nickName = action.payload.nickName;
      state.themeColor = action.payload.themeColor;
      state.profileImagePath = action.payload.profileImagePath;
      state.walletAddress = action.payload.walletAddress;
    },
    setLogOut(state, action) {
      state.isLogIn = false;
      state.pageName = "";
      state.nickName = "";
      state.color = 0;
      state.profileImagePath = "";
      state.walletAddress = "";
    },
  },
});

export const { setLogIn, setLogOut, setLoading, setConnected } =
  memberSlice.actions;

export default memberSlice.reducer;
