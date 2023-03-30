import { nicknameValidator, pageNameValidator } from "./validator";

export const checkSignUpValidation = (nickName, pageName) => {
  if (!nicknameValidator(nickName)) {
    alert("NickName is not the correct format.");
    return false;
  }

  if (!pageNameValidator(pageName)) {
    alert("page Name is not the correct format.");
    return false;
  }

  return true;
};
