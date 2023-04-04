import { titleValidator, priceValidator } from "./validator";
import sendToastMessage from "../../utils/sendToastMessage";

export const checkItemValidation = ({ name, price }) => {
  if (!titleValidator(name)) {
    sendToastMessage("🚫 Name is not the correct format.");
    return false;
  }

  if (!priceValidator(price)) {
    sendToastMessage("🚫 Price is not the correct format.");
    return false;
  }

  return true;
};
