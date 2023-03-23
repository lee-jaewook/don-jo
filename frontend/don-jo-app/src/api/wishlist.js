import { defaultInstance as api } from "./utils";

export const wishlistAPI = {
  // 위시리스트 등록 API
  registerWishlistItem: (cond) =>
    api.post(`/auth/member/wishlist/limited`, cond),

  // 위시리스트 수정 API
  updateWishlistItem: (cond) => api.put(`/auth/member/wishlist/limited`, cond),

  // 위시리스트 목록 조회 API
  getWishList: (memberAddress, pageNum, pageSize) =>
    api.get(
      `/member/wishlists?memberAddress=${memberAddress}&pageNum=${pageNum}&pageSize=${pageSize}`
    ),

  // 위시리스트 단일 조회 API
  getWishlistItemDetail: (wishlistUid) =>
    api.get(`/member/wishlist?wishlistUid=${wishlistUid}`),

  // 위시리스트 삭제 API
  deleteWishlistItem: (wishlistUid) =>
    api.delete(`/auth/member/wishlist?wishlistUid=${wishlistUid}`),
};
