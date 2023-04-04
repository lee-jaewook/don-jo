import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundImgPath: null,
  introduction: null,
  memberAddress: "",
  nickname: "",
  numSupporters: 0,
  profileImgPath: "",
  socialList: ["", "", ""],
  themeColor: 0,
};

export const memberInfoSlice = createSlice({
  name: "memberInfo",
  initialState,
  reducers: {
    updateMemberInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateMemberInfo } = memberInfoSlice.actions;
export default memberInfoSlice.reducer;
