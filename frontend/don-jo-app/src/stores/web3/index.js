import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  web3: null,
};

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setWeb3(state, action) {
      state.web3 = action.payload.web3;
    },
  },
});

export const { setWeb3 } = web3Slice.actions;
export default web3Slice.reducer;
