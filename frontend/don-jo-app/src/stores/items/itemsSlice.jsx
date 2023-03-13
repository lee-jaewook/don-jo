import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  web3: null,
  connected: false,
  isLogIn: false,
  member: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setWeb3(state, action) {
      state.web3 = action.payload.web3;
      state.isLogIn = true;
      state.connected = true;
    },
    setLogOut: {},
  },
});

export const { setLoading, setConnected, setWeb3 } = memberSlice.actions;

export default memberSlice.reducer;
