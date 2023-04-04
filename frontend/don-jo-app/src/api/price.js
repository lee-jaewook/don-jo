import { defaultInstance as api } from "./utils";

export const priceApi = {
  // 폴리곤 가격 확인
  getItemDetail: () => api.get(`/matic/price`),
};
