export const nicknameValidator = (nickname) => {
  const nicknameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  if (nicknameRegex.test(nickname)) {
    return true;
  }
  return false;
};
