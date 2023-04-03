import { defaultInstance as api } from "./utils";

export const itemApi = {
  // 아이템 등록 API
  registerItem: (cond) => api.post(`/auth/member/item/limited`, cond),

  // 아이템 수정 API
  updateItem: (cond) => api.put(`/auth/member/item/limited`, cond),

  // 아이템 목록 조회 API
  getItemList: (memberAddress, pageNum, pageSize) =>
    api.get(
      `/member/items?memberAddress=${memberAddress}&pageNum=${pageNum}&pageSize=${pageSize}`
    ),

  // 아이템 단일 조회 API
  getItemDetail: (itemUid) => api.get(`/member/item?itemUid=${itemUid}`),

  // 아이템 삭제 API
  deleteItem: (itemUid) => api.delete(`/auth/member/item?itemUid=${itemUid}`),

  // 아이템 전체 조회 API
  getAllItems: (memberAddress) =>
    api.get(`/member/items/all?memberAddress=${memberAddress}`),
  //아이템 구매 여부 조회 API
  getIsPurchased: (itemUid, memberAddress) =>
    api.get(
      `/member/item/purchased?itemUid=${itemUid}&memberAddress=${memberAddress}`
    ),
};
