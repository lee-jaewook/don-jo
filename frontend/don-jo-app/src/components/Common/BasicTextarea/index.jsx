import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";

const handleKeyDown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
};

const BasicTextarea = ({
  handleOnChangeValue,
  placeholder,
  isReadOnly,
  width,
  height,
  id,
  value,
  disabled = false,
}) => {
  return (
    <S.Textarea
      id={id}
      onKeyDown={handleKeyDown}
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
      width={width}
      height={height}
      defaultValue={value}
      disabled={disabled}
    />
  );
};

export default BasicTextarea;

BasicTextarea.propTypes = {
  id: PropTypes.string,
  handleOnChangeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  disabled: PropTypes.bool,
};
