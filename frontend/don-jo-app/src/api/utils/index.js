import axios from "axios";
const BASE_URL = "https://j8a209.p.ssafy.io/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor 설정 필요

export const defaultInstance = instance;
