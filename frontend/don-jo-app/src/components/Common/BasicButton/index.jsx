import React from "react";
import PropTypes from "prop-types";
const BasicButton = ({
  text,
  handleOnClickButton,
  isBackground,
  isDisabled,
}) => {
  return (
    <button
      onClick={handleOnClickButton}
      isBackground={isBackground}
      isDisabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default BasicButton;

BasicButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
  isBackground: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
