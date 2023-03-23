import axios from "axios";
const BASE_URL = "https://j8a209.p.ssafy.io/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor 설정 필요

instance.interceptors.request.use(function (config) {
  console.log("interceptor request");
  const accesstoken = localStorage.getItem("accesstoken");

  if (!accesstoken) {
    config.headers.accessToken = null;
    return config;
  }

  if (config.headers && accesstoken) {
    config.headers.accessToken = `${accesstoken}`;
    return config;
  }
});

instance.interceptors.response.use(
  (response) => {
    console.log("interceptor response 200");
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const refreshtoken = sessionStorage.getItem("refreshtoken");
      const originalRequest = config;

      // 토큰 재발급을 위한 요청
      if (refreshtoken) {
        const data = await axios.get(
          `https://j8a209.p.ssafy.io/api/member/refresh`,
          {
            headers: {
              refreshToken: `${refreshtoken}`,
            },
          }
        );

        const accesstoken = data;
        await localStorage.setItem("accesstoken", accesstoken);

        originalRequest.headers.accesstoken = `Bearer ${accesstoken}`;
        return axios(originalRequest);
      }
    }

    console.log("refreshToken 발급 에러: ", error);
    return Promise.reject(error);
  }
);

export const defaultInstance = instance;
