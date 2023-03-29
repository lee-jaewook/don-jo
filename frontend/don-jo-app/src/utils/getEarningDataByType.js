import { supportApi } from "../api/support";

export const getEarningDataByType = async (type) => {
  const earningData = [0, 30];
  const result = [];

  // 총 후원자 수 조회
  try {
    const { data } = await supportApi.getSupportCount(type);
    result.push(data);
  } catch (error) {
    console.log("error: ", error);
  }

  // 전체 기간 및 30일 동안 수익금 조회
  earningData.map(async (earning) => {
    try {
      const { data } = await supportApi.getAllEarnings(earning, type);
      result.push(data);
    } catch (error) {
      console.log("error: ", error);
    }
  });

  return result;
};
