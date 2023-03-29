const maxFileSize = 500 * 1024 * 1024;

export const checkImageSize = (file) => {
  if (file && file.size > maxFileSize) {
    return false;
  }
  return true;
};
