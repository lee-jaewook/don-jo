import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";
const BasicButton = ({
  text,
  color = "var(--color-primary)",
  handleOnClickButton,
  isBackground,
  isDisabled,
}) => {
  return (
    <S.Button
      color={color}
      onClick={handleOnClickButton}
      isBackground={isBackground}
      isDisabled={isDisabled}
    >
      {text}
    </S.Button>
  );
};

export default BasicButton;

BasicButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
  isBackground: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
