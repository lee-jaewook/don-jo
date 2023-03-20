import { useState } from "react";

export const useInput = (initValue = "") => {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    if (typeof e === "object") {
      const { value } = e.target;
      setValue(value);
    } else {
      setValue(e);
    }
  };

  return [value, onChange];
};
