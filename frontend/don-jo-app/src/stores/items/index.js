import { createSlice } from "@reduxjs/toolkit";
export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    currentItem: {},
  },
  reducers: {
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
  },
});

export const { setCurrentItem } = itemsSlice.actions;
export default itemsSlice.reducer;
