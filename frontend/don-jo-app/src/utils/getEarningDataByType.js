import { supportApi } from "../api/support";

export const getEarningDataByType = async (type) => {
  const result = [];

  try {
    const { data: supportCount } = await supportApi.getSupportCount(type);
    const { data: allData } = await supportApi.getAllEarnings(0, type);
    const { data } = await supportApi.getAllEarnings(30, type);

    result.push(supportCount);
    result.push(allData);
    result.push(data);
  } catch (error) {
    console.log("[Dashboard] getEarningDataByType()...", error);
  }

  return result;
};
