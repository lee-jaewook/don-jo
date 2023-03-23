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
};
