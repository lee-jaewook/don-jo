import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";
const BasicInput = ({
  id,
  type,
  value,
  handleOnChangeValue,
  placeholder = "",
  isReadOnly = false,
}) => {
  return (
    <S.Input
      id={id}
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
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "number", "price"]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleOnChangeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
