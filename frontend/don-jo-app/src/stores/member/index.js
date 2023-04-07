import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  isLogIn: false,
  isMember: false,
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
    setWallet(state, action) {
      state.walletAddress = action.payload.walletAddress;
    },
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
      state.walletAddress = "";
      state.themeColor = 0;
      state.profileImagePath = "";
      state.walletAddress = "";
    },
    setIsMember(state, action) {
      state.isMember = action.payload;
    },

    setProfileImg(state, action) {
      state.profileImagePath = action.payload.profileImagePath;
    },

    setMemberAccount(state, action) {
      state.pageName = action.payload.pageName;
      state.nickName = action.payload.nickName;
      state.themeColor = action.payload.themeColor;
      state.profileImagePath = action.payload.profileImagePath;
    },
  },
});

export const {
  setWallet,
  setLogIn,
  setLogOut,
  setIsMember,
  setLoading,
  setConnected,
  setProfileImg,
  setMemberAccount,
} = memberSlice.actions;

export default memberSlice.reducer;
