/**
 *
 * 1. 소수점 아래 5자리까지
 * 2. 0으로 시작 가능
 */

export const priceValidator = (price) => {
  const priceRegex = /^(\$)?(\d{1,3})(,\d{3})*(\.\d{1,2})?$/;
  if (priceRegex.test(price)) {
    return true;
  }
  return false;
};
