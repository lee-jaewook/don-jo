import {
  fileSizeValidator,
  imageSizeValidator,
  titleValidator,
  priceValidator,
} from "./Validator/fileSizeValidator";

/**
 * validation check list
 * 1. Name
 * 2. Price
 * 3. Featured Image => size check
 * 4. File  => size check
 * 5. message => default 값이 존재. 할필요없음
 */

const checkItemValidation = ({ name, price, image, file }) => {
  if (!titleValidator(name)) {
    alert("Name을 다시 입력해주세요.");
    return false;
  }

  if (!priceValidator(price)) {
    alert("가격을 다시 입력해주세요.");
    return false;
  }

  if (!imageSizeValidator(image)) {
    alert("Image의 용량을 초과했습니다.");
    return false;
  }

  if (!fileSizeValidator(file)) {
    alert("파일의 용량을 초과했습니다.");
    return false;
  }
};
