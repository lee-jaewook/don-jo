/**
 * 1. 영문 대소문자, 숫자, 공백, 특수문자 등을 포함하여
 *    최소 1자 이상, 최대 100자까지 입력 가능.
 */

export const titleValidation = (title) => {
  const titleRegex = /^[\w\d\s~`!@#$%^&*()\-_+=\[\]{}\\|:;"'<>,.?/]{1,100}$/;
  if (titleRegex.test(title)) {
    return true;
  }
  return false;
};
