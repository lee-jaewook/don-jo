export const checkPriceValidation = (price) => {
  const priceRegex = /^(\$)?(\d{1,3})(,\d{3})*(\.\d{1,2})?$/;
  if (priceRegex.test(price)) {
    return true;
  } else {
    return false;
  }
};
