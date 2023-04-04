import { createSlice } from "@reduxjs/toolkit";
export const donationSlice = createSlice({
  name: "donation",
  initialState: {
    settings: {},
  },
  reducers: {
    setDonationSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

export const { setDonationSettings } = donationSlice.actions;
export default donationSlice.reducer;
