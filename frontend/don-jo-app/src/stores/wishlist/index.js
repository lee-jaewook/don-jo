import { createSlice } from "@reduxjs/toolkit";
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    refreshWishlistStatus: false,
  },
  reducers: {
    setRefreshWishlistStatus: (state, action) => {
      state.refreshWishlistStatus = action.payload;
    },
  },
});

export const { setRefreshWishlistStatus } = wishlistSlice.actions;
export default wishlistSlice.reducer;
