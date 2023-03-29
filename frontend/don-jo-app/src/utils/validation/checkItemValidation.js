import { titleValidator, priceValidator } from "./validator";

/**
 * validation check list
 * 1. Name
 * 2. Price
 * 3. Featured Image => size check
 * 4. File  => size check
 * 5. message => default 값이 존재. 할필요없음
 */

export const checkItemValidation = ({ name, price, image }) => {
  if (!titleValidator(name)) {
    alert("Name is not the correct format.");
    return false;
  }

  if (!priceValidator(price)) {
    alert("Price is not the correct format.");
    return false;
  }

  return true;
};
