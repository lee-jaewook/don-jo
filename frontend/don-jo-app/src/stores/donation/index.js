import { createSlice } from "@reduxjs/toolkit";
export const donationSlice = createSlice({
  name: "donation",
  initialState: {
    donationStatus: false,
    settings: {},
  },
  reducers: {
    setDonationSettings(state, action) {
      state.settings = action.payload;
    },
    setDonationStatus: (state, action) => {
      state.donationStatus = action.payload;
    },
  },
});

export const { setDonationSettings, setDonationStatus } = donationSlice.actions;
export default donationSlice.reducer;
