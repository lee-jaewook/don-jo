import { defaultInstance as api } from "./utils";

export const supportApi = {
  // 수익금 조회 API
  getAllEarnings: (period, type) =>
    api.get(`/auth/member/dashboard/earning?period=${period}&type=${type}`),

  // 대시보드 서포트 조회 API
  getSupportList: (memberAddress, pageNum, pageSize, type) =>
    api.get(
      `/auth/member/dashboard/supports?memberAddress=${memberAddress}&pageNum=${pageNum}&pageSize=${pageSize}&type=${type}`
    ),

  // 도네이션 설정 조회 API
  getDonationSettings: () => api.get(`/auth/member/donation/setting`),

  // 도네이션 설정 수정 API
  updateDonationSettings: (donationDto) =>
    api.put(`/auth/member/donation/setting`, donationDto),

  // 후원내역 저장 API
  saveSponsorshipDetail: (supportRequestDto) =>
    api.post(`/auth/member/supports`, supportRequestDto),

  // 서포트 수 조회 API
  getSupportCount: (type) => api.get(`/member/supporters/count?type=${type}`),

  // 서포트 상세 조회 API
  getSupportDetail: (supportUid, type) =>
    api.get(`/member/supports?supportUid=${supportUid}&type=${type}`),

  // 최근 후원 내역 10건 조회 API - intro page 전광판에서만 사용
  getSponsorshipList: () => api.get(`/main/supports`),
};
