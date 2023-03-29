const maxFileSize = 500 * 1024 * 1024;

export const fileSizeValidator = (file) => {
  if (file && file.size > maxFileSize) {
    return false;
  }
  return true;
};
