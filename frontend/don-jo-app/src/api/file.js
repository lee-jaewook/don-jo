import { defaultInstance as api } from "./utils";

export const fileApi = {
  // 파일 업로드 API
  uploadFile: (fileData, category) =>
    api.post(`/file?category=${category}`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
