import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";

const BasicTextarea = ({
  handleOnChangeValue,
  placeholder,
  isReadOnly,
  width,
  height,
}) => {
  return (
    <S.Textarea
      type="string"
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
      width={width}
      height={height}
    />
  );
};

export default BasicTextarea;

BasicTextarea.propTypes = {
  handleOnChangeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};
