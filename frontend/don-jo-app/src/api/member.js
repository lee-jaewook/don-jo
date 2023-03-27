import { defaultInstance as api } from "./utils";

export const memberApi = {
  // 회원가입 API
  signUp: (signUpMemberCond) => api.post(`/member`, signUpMemberCond),

  // 로그인 API
  login: (loginMemberCond) => api.post(`/members`, loginMemberCond),

  // 로그아웃 API
  logout: () => api.get(`/auth/member/logout`),

  // 기존 사용자인지 확인 API
  checkMemberAddress: (memberAddress) => api.get(`/members/${memberAddress}`),

  // 페이지이름 중복 검사 API
  checkPageName: (pageName) =>
    api.get(`/members/page-name/check?pageName=${pageName}`),

  // 사용자 정보 조회 API
  getUserInfo: () => api.get(`/auth/member/info`),

  // 사용자 정보 수정 API
  updateUserInfo: (memberCond) => api.put(`/auth/member/info`, memberCond),

  // 페이지 정보 조회 API
  getPageInfo: (pageName) => api.get(`/pages/${pageName}`),

  // 사용자 배경사진 수정 API
  updateUserBackground: (backgroundImgSrc) =>
    api.put(`/auth/member/background`, backgroundImgSrc),

  // 사용자 프로필사진 수정 API
  updateUserProfile: (profileImgSrc) =>
    api.put(`/auth/member/profile`, profileImgSrc),

  // 사용자 자기소개 수정 API
  updateUserIntroduction: (introduction) =>
    api.put(`/auth/member/introduction`, introduction),
};
