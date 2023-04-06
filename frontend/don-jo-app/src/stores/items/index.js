import { createSlice } from "@reduxjs/toolkit";
export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    itemStatus: false,
    refreshItemStatus: false,
    currentItem: {},
  },
  reducers: {
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    setItemStatus: (state, action) => {
      state.itemStatus = action.payload;
    },
    setRefreshItemStatus: (state, action) => {
      state.refreshItemStatus = action.payload;
    },
  },
});

export const { setCurrentItem, setItemStatus, setRefreshItemStatus } = itemsSlice.actions;
export default itemsSlice.reducer;
