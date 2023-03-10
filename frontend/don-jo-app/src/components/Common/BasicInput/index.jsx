import React from "react";
import PropTypes from "prop-types";
const BasicInput = ({
  type,
  value,
  handleOnChangeValue,
  placeholder = "",
  isReadOnly = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
    />
  );
};

export default BasicInput;

BasicInput.propTypes = {
  type: PropTypes.oneOf(["text", "password", "number", "price"]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleOnChangeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
