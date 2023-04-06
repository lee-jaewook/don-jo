import { titleValidator, priceValidator } from "./validator";
import sendToastMessage from "../../utils/sendToastMessage";

export const checkItemValidation = ({ name, price }) => {
  if (!titleValidator(name)) {
    sendToastMessage("🚫 Name is not the correct format.");
    return false;
  }

  if (!priceValidator(price)) {
    sendToastMessage(
      "🚫 The price can only be entered up to the third decimal place."
    );
    return false;
  }

  return true;
};
